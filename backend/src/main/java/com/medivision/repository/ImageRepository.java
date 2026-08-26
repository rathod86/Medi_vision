package com.medivision.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medivision.model.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

}