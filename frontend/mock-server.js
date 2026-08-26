import express from "express";
import cors from "cors";

import {
  seedUsers,
  seedDoctors,
  seedPatients,
  seedAppointments,
  seedAdmissions,
  seedBillings,
  seedMedicines,
  seedPrescriptions,
  seedLabReports,
  seedIcuRecords,
  seedNurses,
  seedMedicalHistories,
  nextIds as seedNextIds,
} from "./mock-server-data.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

// =====================================================
// IN-MEMORY STATE
// =====================================================

const state = {
  users: structuredClone(seedUsers),
  doctors: structuredClone(seedDoctors),
  patients: structuredClone(seedPatients),
  appointments: structuredClone(seedAppointments),
  admissions: structuredClone(seedAdmissions),
  billings: structuredClone(seedBillings),
  medicines: structuredClone(seedMedicines),
  prescriptions: structuredClone(seedPrescriptions),
  labReports: structuredClone(seedLabReports),
  icuRecords: structuredClone(seedIcuRecords),
  nurses: structuredClone(seedNurses),
  medicalHistories: structuredClone(seedMedicalHistories),
  nextIds: structuredClone(seedNextIds),
};

// =====================================================
// JWT HELPERS
// =====================================================

const makeToken = (user) => {
  const header = { alg: "none", typ: "JWT" };
  const payload = {
    sub: user.email,
    role: user.role,
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  const toBase64 = (obj) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  return `${toBase64(header)}.${toBase64(payload)}.`;
};

const decodeToken = (token) => {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8")
    );

    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

const sanitizeUser = (user) => {
  const { password, ...safe } = user;
  return safe;
};

const findUserByEmail = (email) =>
  state.users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

const findUserById = (id) =>
  state.users.find((u) => u.id === Number(id));

// =====================================================
// AUTH MIDDLEWARE
// =====================================================

const optionalAuth = (req, _res, next) => {
  const auth = req.headers.authorization;

  if (auth?.startsWith("Bearer ")) {
    const payload = decodeToken(auth.slice(7));
    if (payload) {
      req.authUser = findUserByEmail(payload.sub);
    }
  }

  next();
};

const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const payload = decodeToken(auth.slice(7));

  if (!payload) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const user = findUserByEmail(payload.sub);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (!user.active) {
    return res.status(403).json({ message: "Account is inactive" });
  }

  if (user.accountLocked) {
    return res.status(403).json({ message: "Account is locked" });
  }

  req.authUser = user;
  next();
};

// =====================================================
// GENERIC CRUD
// =====================================================

const registerCrud = (basePath, key) => {
  const apiPath = `/api/${basePath}`;

  app.get(apiPath, optionalAuth, (_req, res) => {
    res.json(state[key]);
  });

  app.get(`${apiPath}/:id`, optionalAuth, (req, res) => {
    const item = state[key].find((x) => x.id === Number(req.params.id));

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(item);
  });

  app.post(apiPath, requireAuth, (req, res) => {
    const id = state.nextIds[key] ?? Date.now();
    state.nextIds[key] = id + 1;

    const item = { ...req.body, id };
    state[key].push(item);
    res.status(201).json(item);
  });

  app.put(`${apiPath}/:id`, requireAuth, (req, res) => {
    const index = state[key].findIndex(
      (x) => x.id === Number(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({ message: "Not found" });
    }

    state[key][index] = {
      ...state[key][index],
      ...req.body,
      id: Number(req.params.id),
    };

    res.json(state[key][index]);
  });

  app.delete(`${apiPath}/:id`, requireAuth, (req, res) => {
    const index = state[key].findIndex(
      (x) => x.id === Number(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({ message: "Not found" });
    }

    state[key].splice(index, 1);
    res.json({ message: "Deleted successfully" });
  });
};

// =====================================================
// AUTH ROUTES
// =====================================================

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.active) {
    return res.status(403).json({ message: "Your account is inactive or locked" });
  }

  if (user.accountLocked) {
    return res.status(403).json({ message: "Your account is inactive or locked" });
  }

  user.lastLogin = new Date().toISOString();
  const token = makeToken(user);

  res.json({
    token,
    user: sanitizeUser(user),
  });
});

app.post("/auth/signup", (req, res) => {
  const { username, fullName, email, phone, password } = req.body || {};

  if (!username || !fullName || !email || !password) {
    return res.status(400).json({
      message: "Username, full name, email, and password are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must contain at least 8 characters",
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  if (
    state.users.some(
      (u) =>
        u.email.toLowerCase() === normalizedEmail ||
        u.username.toLowerCase() === String(username).trim().toLowerCase()
    )
  ) {
    return res.status(409).json({ message: "Email or username already exists" });
  }

  const patientId = state.nextIds.patients;
  state.nextIds.patients += 1;

  const newPatient = {
    id: patientId,
    patientCode: `PAT${String(patientId).padStart(3, "0")}`,
    fullName: String(fullName).trim(),
    email: normalizedEmail,
    phone: phone?.trim() || "",
    gender: "Not Specified",
    bloodGroup: "Unknown",
    dateOfBirth: "",
    address: "",
    status: "Active",
    emergencyContact: "",
    emergencyPhone: "",
  };

  state.patients.push(newPatient);

  const userId = state.nextIds.users;
  state.nextIds.users += 1;

  const newUser = {
    id: userId,
    username: String(username).trim(),
    fullName: String(fullName).trim(),
    email: normalizedEmail,
    password,
    phone: phone?.trim() || "",
    role: "PATIENT",
    patientId,
    active: true,
    accountLocked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: null,
  };

  state.users.push(newUser);

  res.status(201).json({
    message: "Account created successfully",
    user: sanitizeUser(newUser),
  });
});

app.get("/auth/me", requireAuth, (req, res) => {
  res.json(sanitizeUser(req.authUser));
});

// =====================================================
// ENTITY CRUD
// =====================================================

registerCrud("doctors", "doctors");
registerCrud("patients", "patients");
registerCrud("appointments", "appointments");
registerCrud("admissions", "admissions");
registerCrud("billings", "billings");
registerCrud("medicines", "medicines");
registerCrud("prescriptions", "prescriptions");
registerCrud("lab-reports", "labReports");
registerCrud("icu-records", "icuRecords");
registerCrud("nurses", "nurses");
registerCrud("medical-histories", "medicalHistories");

// =====================================================
// USER MANAGEMENT (ADMIN)
// =====================================================

const usersPath = "/api/users";

app.get(usersPath, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(state.users.map(sanitizeUser));
});

app.get(`${usersPath}/:id`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const user = findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(sanitizeUser(user));
});

app.post(usersPath, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const id = state.nextIds.users;
  state.nextIds.users += 1;

  const user = {
    ...req.body,
    id,
    active: req.body.active ?? true,
    accountLocked: req.body.accountLocked ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: null,
  };

  state.users.push(user);
  res.status(201).json(sanitizeUser(user));
});

app.put(`${usersPath}/:id`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const index = state.users.findIndex(
    (u) => u.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  state.users[index] = {
    ...state.users[index],
    ...req.body,
    id: Number(req.params.id),
    updatedAt: new Date().toISOString(),
  };

  res.json(sanitizeUser(state.users[index]));
});

app.delete(`${usersPath}/:id`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const index = state.users.findIndex(
    (u) => u.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  state.users.splice(index, 1);
  res.json({ message: "User deleted" });
});

app.patch(`${usersPath}/:id/activate`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const user = findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.active = true;
  res.json(sanitizeUser(user));
});

app.patch(`${usersPath}/:id/deactivate`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const user = findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.active = false;
  res.json(sanitizeUser(user));
});

app.patch(`${usersPath}/:id/lock`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const user = findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.accountLocked = true;
  res.json(sanitizeUser(user));
});

app.patch(`${usersPath}/:id/unlock`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const user = findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.accountLocked = false;
  res.json(sanitizeUser(user));
});

app.get(`${usersPath}/search`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const keyword = String(req.query.keyword || "").toLowerCase();
  const results = state.users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword) ||
      u.username.toLowerCase().includes(keyword)
  );

  res.json(results.map(sanitizeUser));
});

app.get(`${usersPath}/role`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  const role = String(req.query.role || "").toUpperCase();
  const results = state.users.filter((u) => u.role === role);
  res.json(results.map(sanitizeUser));
});

app.get(`${usersPath}/active`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(state.users.filter((u) => u.active).map(sanitizeUser));
});

app.get(`${usersPath}/inactive`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(state.users.filter((u) => !u.active).map(sanitizeUser));
});

app.get(`${usersPath}/locked`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(state.users.filter((u) => u.accountLocked).map(sanitizeUser));
});

app.get(`${usersPath}/unlocked`, requireAuth, (req, res) => {
  if (req.authUser.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(state.users.filter((u) => !u.accountLocked).map(sanitizeUser));
});

// =====================================================
// PRESCRIPTION STATISTICS
// =====================================================

const prescriptionStats = () => {
  const all = state.prescriptions;
  const today = new Date().toISOString().split("T")[0];

  return {
    totalPrescriptions: all.length,
    todayPrescriptions: all.filter((p) => p.prescriptionDate === today).length,
    draftPrescriptions: all.filter((p) => p.status === "Draft").length,
    issuedPrescriptions: all.filter((p) => p.status === "Issued").length,
    dispensedPrescriptions: all.filter((p) => p.status === "Dispensed").length,
    completedPrescriptions: all.filter((p) => p.status === "Completed").length,
    cancelledPrescriptions: all.filter((p) => p.status === "Cancelled").length,
  };
};

app.get("/api/prescriptions/statistics", optionalAuth, (_req, res) => {
  res.json(prescriptionStats());
});

app.get("/api/prescriptions/statistics/total", optionalAuth, (_req, res) => {
  res.json({ total: state.prescriptions.length });
});

app.get("/api/prescriptions/statistics/today", optionalAuth, (_req, res) => {
  const today = new Date().toISOString().split("T")[0];
  res.json({
    today: state.prescriptions.filter((p) => p.prescriptionDate === today).length,
  });
});

app.get("/api/prescriptions/latest", optionalAuth, (_req, res) => {
  res.json(state.prescriptions.slice(-5));
});

// =====================================================
// MEDICINE STATS
// =====================================================

app.get("/api/medicines/stats", optionalAuth, (_req, res) => {
  res.json({
    total: state.medicines.length,
    available: state.medicines.filter((m) => m.status === "Available").length,
    lowStock: state.medicines.filter((m) => m.stockQuantity <= m.reorderLevel).length,
    expired: state.medicines.filter((m) => m.status === "Expired").length,
  });
});

app.get("/api/medicines/low-stock", optionalAuth, (_req, res) => {
  res.json(
    state.medicines.filter((m) => m.stockQuantity <= m.reorderLevel)
  );
});

// =====================================================
// DASHBOARD
// =====================================================

const todayStr = () => new Date().toISOString().split("T")[0];

const buildDashboardOverview = () => {
  const today = todayStr();

  return {
    totalDoctors: state.doctors.length,
    totalPatients: state.patients.length,
    totalAppointments: state.appointments.length,
    todayAppointments: state.appointments.filter(
      (a) => a.appointmentDate === today
    ).length,
    totalAdmissions: state.admissions.length,
    totalMedicines: state.medicines.length,
    totalNurses: state.nurses.length,
    totalPrescriptions: state.prescriptions.length,
  };
};

app.get("/api/dashboard", optionalAuth, (_req, res) => {
  res.json(buildDashboardOverview());
});

app.get("/api/dashboard/full", optionalAuth, (_req, res) => {
  const today = todayStr();
  const totalRevenue = state.billings.reduce(
    (sum, b) =>
      sum +
      (b.consultationCharges || 0) +
      (b.roomCharges || 0) +
      (b.medicineCharges || 0) +
      (b.labCharges || 0) +
      (b.surgeryCharges || 0) +
      (b.icuCharges || 0) +
      (b.otherCharges || 0) -
      (b.discount || 0) +
      (b.tax || 0),
    0
  );

  const activeAdmissions = state.admissions.filter(
    (a) => a.status === "Admitted"
  ).length;

  const activeIcu = state.icuRecords.filter(
    (r) => r.status === "Active"
  ).length;

  res.json({
    overview: buildDashboardOverview(),
    billing: {
      totalRevenue,
      pendingAmount: state.billings
        .filter((b) => b.paymentStatus === "PENDING")
        .reduce((sum, b) => sum + (b.paidAmount || 0), 0),
      paidBills: state.billings.filter((b) => b.paymentStatus === "PAID").length,
    },
    labReports: {
      total: state.labReports.length,
      pending: state.labReports.filter((r) => r.status === "Pending").length,
      completed: state.labReports.filter((r) => r.status === "Completed").length,
    },
    icuRecords: {
      total: state.icuRecords.length,
      active: activeIcu,
    },
    admissions: {
      total: state.admissions.length,
      active: activeAdmissions,
      today: state.admissions.filter((a) => a.admissionDate === today).length,
      dischargedToday: state.admissions.filter(
        (a) => a.dischargeDate === today
      ).length,
    },
    bedOccupancy: {
      totalBeds: 250,
      occupiedBeds: activeAdmissions + activeIcu,
      availableBeds: 250 - (activeAdmissions + activeIcu),
      occupancyRate: `${Math.round(
        ((activeAdmissions + activeIcu) / 250) * 100
      )}%`,
    },
    recentActivity: [
      {
        id: 1,
        message: `New patient ${state.patients[state.patients.length - 1]?.fullName || "registered"}`,
        time: "5 mins ago",
      },
      {
        id: 2,
        message: `${state.appointments.filter((a) => a.appointmentDate === today).length} appointments scheduled today`,
        time: "15 mins ago",
      },
      {
        id: 3,
        message: `${state.medicines.filter((m) => m.stockQuantity <= m.reorderLevel).length} medicines low on stock`,
        time: "30 mins ago",
      },
    ],
    todaysAdmissions: state.admissions
      .filter((a) => a.admissionDate === today)
      .map((a) => ({
        id: a.admissionNumber,
        patient: a.patientName,
        ward: a.ward,
        room: a.roomNumber,
        doctor: a.doctorName,
      })),
    todaysDischarges: state.admissions
      .filter((a) => a.dischargeDate === today)
      .map((a) => ({
        id: a.admissionNumber,
        patient: a.patientName,
        ward: a.ward,
        room: a.roomNumber,
        doctor: a.doctorName,
      })),
  });
});

app.get("/api/dashboard/doctor-stats", optionalAuth, (_req, res) => {
  res.json({
    totalDoctors: state.doctors.length,
    activeDoctors: state.doctors.filter((d) => d.status === "Active").length,
  });
});

app.get("/api/dashboard/patient-stats", optionalAuth, (_req, res) => {
  res.json({
    totalPatients: state.patients.length,
    activePatients: state.patients.filter((p) => p.status === "Active").length,
  });
});

// =====================================================
// APPOINTMENT SEARCH / FILTER
// =====================================================

app.get("/api/appointments/search", optionalAuth, (req, res) => {
  const keyword = String(req.query.keyword || "").toLowerCase();
  const results = state.appointments.filter(
    (a) =>
      a.patientName?.toLowerCase().includes(keyword) ||
      a.doctorName?.toLowerCase().includes(keyword) ||
      a.appointmentNumber?.toLowerCase().includes(keyword)
  );
  res.json(results);
});

app.get("/api/appointments/filter", optionalAuth, (req, res) => {
  let results = [...state.appointments];

  if (req.query.status) {
    results = results.filter(
      (a) =>
        a.status?.toLowerCase() ===
        String(req.query.status).toLowerCase()
    );
  }

  if (req.query.doctorId) {
    results = results.filter(
      (a) => a.doctorId === Number(req.query.doctorId)
    );
  }

  if (req.query.patientId) {
    results = results.filter(
      (a) => a.patientId === Number(req.query.patientId)
    );
  }

  res.json(results);
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Medi Vision Mock API",
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// 404 HANDLER
// =====================================================

app.use((_req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
    path: _req.path,
  });
});

app.listen(PORT, () => {
  console.log(`Medi Vision Mock API listening on http://localhost:${PORT}`);
  console.log("Demo accounts:");
  console.log("  Admin:        admin@medivision.com / Admin@12345");
  console.log("  Doctor:       doctor@medivision.com / Doctor@12345");
  console.log("  Patient:      patient@medivision.com / Patient@12345");
  console.log("  Nurse:        nurse@medivision.com / Nurse@12345");
  console.log("  Receptionist: receptionist@medivision.com / Receptionist@12345");
  console.log("  Lab Tech:     lab@medivision.com / Lab@12345");
  console.log("  Pharmacist:   pharmacist@medivision.com / Pharmacist@12345");
});
