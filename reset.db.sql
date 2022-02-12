DROP TABLE IF EXISTS `application`;
DROP TABLE IF EXISTS `course`;

CREATE TABLE `application` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(100) NOT NULL,
    `version` INT NOT NULL, 
    PRIMARY KEY (`id`)
);

CREATE TABLE `course` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(100) NOT NULL,
    `date` DATE,
    `application_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`application_id`) REFERENCES application(`id`)
);