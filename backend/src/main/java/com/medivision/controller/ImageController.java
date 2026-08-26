package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.medivision.model.Image;
import com.medivision.service.ImageService;

@RestController

@RequestMapping("/api/images")

@CrossOrigin("*")

public class ImageController {

    @Autowired

    private ImageService imageService;

    // Save Image

    @PostMapping

    public Image saveImage(@RequestBody Image image) {

        return imageService.saveImage(image);
    }

    // Get All Images

    @GetMapping

    public List<Image> getAllImages() {

        return imageService.getAllImages();
    }

    // Get By Id

    @GetMapping("/{id}")

    public Image getImageById(@PathVariable Long id) {

        return imageService.getImageById(id);
    }

    // Delete Image

    @DeleteMapping("/{id}")

    public String deleteImage(@PathVariable Long id) {

        imageService.deleteImage(id);

        return "Image Deleted Successfully";
    }
}