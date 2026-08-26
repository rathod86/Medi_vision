package com.medivision.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {

    // ==========================================
    // Upload Folder
    // ==========================================

    private static final String UPLOAD_DIR = "uploads";

    // ==========================================
    // Upload File
    // ==========================================

    public String uploadFile(MultipartFile file) throws IOException {

        // Create uploads folder if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Original file name
        String originalFileName = file.getOriginalFilename();

        // Extension
        String extension = "";

        if (originalFileName != null && originalFileName.contains(".")) {

            extension = originalFileName.substring(
                    originalFileName.lastIndexOf("."));

        }

        // Generate unique filename
        String fileName = UUID.randomUUID().toString() + extension;

        // Save file
        Path filePath = uploadPath.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING);

        // Return only filename
        return fileName;
    }

}