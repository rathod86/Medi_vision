import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

const Register = () => {
	return (
		<div className="login-page">
			<div className="login-card">
				<h1>Medi Vision</h1>
				<p>Registration is currently disabled.</p>

				<div style={{ marginTop: 20 }}>
					<p>
						If you need an account, please contact your
						administrator.
					</p>

					<Link to="/login">
						<button style={{ marginTop: 12 }}>
							Go to Login
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;

