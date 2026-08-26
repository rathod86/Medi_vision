package com.medivision.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medivision.model.Image;
import com.medivision.repository.ImageRepository;

@Service

public class ImageService {

    @Autowired

    private ImageRepository imageRepository;

    // Save Image

    public Image saveImage(Image image) {

        return imageRepository.save(image);
    }

    // Get All Images

    public List<Image> getAllImages() {

        return imageRepository.findAll();
    }

    // Get By Id

    public Image getImageById(Long id) {

        return imageRepository.findById(id).orElse(null);
    }

    // Delete Image

    public void deleteImage(Long id) {

        imageRepository.deleteById(id);
    }
}