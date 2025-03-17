-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2025 at 01:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `butnga`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `AddressID` int(11) NOT NULL,
  `Zone` varchar(255) NOT NULL,
  `Barangay` varchar(255) NOT NULL,
  `Town` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`AddressID`, `Zone`, `Barangay`, `Town`) VALUES
(1, '1', 'Butnga', 'Oras'),
(2, '2', 'Butnga', 'Oras'),
(3, '3', 'Butnga', 'Oras'),
(4, '4', 'Butnga', 'Oras');

-- --------------------------------------------------------

--
-- Table structure for table `barangayinhabitants`
--

CREATE TABLE `barangayinhabitants` (
  `ResidentID` int(11) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `GivenName` varchar(255) NOT NULL,
  `MiddleName` varchar(255) DEFAULT NULL,
  `Qualifier` varchar(255) DEFAULT NULL,
  `DateOfBirth` date NOT NULL,
  `PlaceOfBirth` varchar(255) NOT NULL,
  `Sex` varchar(10) NOT NULL,
  `AddressID` int(11) DEFAULT NULL,
  `CivilStatusID` int(11) DEFAULT NULL,
  `OccupationID` varchar(256) DEFAULT NULL,
  `CitizenshipID` int(11) DEFAULT NULL,
  `status` enum('alive','deceased') DEFAULT 'alive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangayinhabitants`
--

INSERT INTO `barangayinhabitants` (`ResidentID`, `LastName`, `GivenName`, `MiddleName`, `Qualifier`, `DateOfBirth`, `PlaceOfBirth`, `Sex`, `AddressID`, `CivilStatusID`, `OccupationID`, `CitizenshipID`, `status`) VALUES
(76, 'Sonco', 'Campesao', 'Balud', 'Jr.', '2025-01-13', 'Can Avid', 'male', 1, 1, 'Student', 1, 'deceased'),
(77, 'Dela Cruz', 'Juan', 'Santos', '', '1990-01-15', 'Manila', 'Male', 1, 1, 'Teacher', 1, 'alive'),
(78, 'Santos', 'Maria', 'Luna', '', '1985-07-22', 'Cebu City', 'Female', 2, 2, 'Nurse', 1, 'alive'),
(79, 'Reyes', 'Jose', 'Cruz', '', '1978-11-03', 'Davao City', 'Male', 3, 1, 'Engineer', 1, 'alive'),
(80, 'Garcia', 'Ana', 'Mendoza', '', '1992-03-18', 'Quezon City', 'Female', 4, 4, 'Accountant', 1, 'alive'),
(81, 'Morales', 'Luis', 'Ramos', '', '1980-12-25', 'Baguio City', 'Male', 1, 5, 'Police Officer', 1, 'alive'),
(82, 'Fernandez', 'Rosa', 'Diaz', '', '1995-06-08', 'Iloilo City', 'Female', 2, 1, 'Doctor', 1, 'alive'),
(83, 'Torres', 'Mark', 'Villanueva', '', '1988-09-30', 'Bacolod City', 'Male', 3, 1, 'Mechanic', 1, 'alive'),
(84, 'Lopez', 'Carla', 'Fernando', '', '1993-04-12', 'Dumaguete City', 'Female', 4, 1, 'Designer', 1, 'alive'),
(85, 'Gomez', 'Juanita', 'Cruz', '', '1982-08-19', 'General Santos', 'Female', 1, 1, 'Farmer', 1, 'alive'),
(86, 'Mendoza', 'Pedro', 'Santos', '', '1991-02-17', 'San Juan', 'Male', 2, 2, 'Fisherman', 1, 'alive'),
(87, 'Ramos', 'Lorena', 'Morales', '', '1987-05-10', 'Tagaytay', 'Female', 3, 1, 'Teacher', 1, 'alive'),
(88, 'Villanueva', 'Edgar', 'Garcia', '', '1975-10-29', 'Antipolo', 'Male', 4, 4, 'Driver', 1, 'alive'),
(89, 'Diaz', 'Clara', 'Torres', '', '1996-01-05', 'Batangas City', 'Female', 1, 5, 'Entrepreneur', 1, 'alive'),
(90, 'Cruz', 'Manuel', 'Gomez', '', '1984-07-21', 'Legazpi City', 'Male', 2, 1, 'Chef', 1, 'alive'),
(91, 'Santiago', 'Isabel', 'Fernandez', '', '1990-11-15', 'Ormoc', 'Female', 3, 1, 'Clerk', 1, 'alive'),
(92, 'Navarro', 'Miguel', 'Lopez', '', '1989-06-07', 'Naga City', 'Male', 4, 1, 'Artist', 1, 'alive'),
(93, 'Castro', 'Luisa', 'Santiago', '', '1986-09-25', 'Pasig City', 'Female', 1, 1, 'Engineer', 1, 'alive'),
(94, 'Delos Reyes', 'Victor', 'Mendoza', '', '1994-03-13', 'Lipa City', 'Male', 2, 2, 'Technician', 1, 'alive'),
(95, 'Aquino', 'Marissa', 'Ramos', '', '1993-08-31', 'Puerto Princesa', 'Female', 3, 1, 'Nurse', 1, 'alive'),
(96, 'De Leon', 'Roberto', 'Villanueva', '', '1979-12-09', 'Valenzuela', 'Male', 4, 4, 'Architect', 1, 'alive'),
(97, 'Padilla', 'Elsa', 'Dela Cruz', '', '1990-04-15', 'Cagayan de Oro', 'Female', 1, 5, 'Seamstress', 1, 'alive'),
(98, 'Bautista', 'Lorenzo', 'Santos', '', '1987-01-12', 'Baguio City', 'Male', 2, 1, 'Businessman', 1, 'alive'),
(99, 'Salvador', 'Clarita', 'Reyes', '', '1983-07-05', 'Manila', 'Female', 3, 1, 'Pharmacist', 1, 'alive'),
(100, 'Ocampo', 'Henry', 'Gomez', '', '1981-10-23', 'Makati', 'Male', 4, 1, 'Carpenter', 1, 'alive'),
(101, 'Martinez', 'Gloria', 'Diaz', '', '1992-02-14', 'Cebu City', 'Female', 1, 1, 'Teacher', 1, 'alive'),
(102, 'Perez', 'Julio', 'Lopez', '', '1985-06-11', 'Tagbilaran', 'Male', 2, 2, 'Electrician', 1, 'alive'),
(103, 'Espinosa', 'Cecilia', 'Fernandez', '', '1978-08-15', 'Zamboanga', 'Female', 3, 1, 'Cashier', 1, 'alive'),
(104, 'Rosales', 'Diego', 'Cruz', '', '1990-05-03', 'San Fernando', 'Male', 4, 4, 'Plumber', 1, 'alive'),
(105, 'Valdez', 'Teresa', 'Morales', '', '1995-09-17', 'Davao City', 'Female', 1, 5, 'Barista', 1, 'alive'),
(106, 'Alvarez', 'Antonio', 'Torres', '', '1983-11-29', 'Iloilo City', 'Male', 2, 1, 'Chef', 1, 'alive'),
(107, 'Garcia', 'Melinda', 'Aquino', '', '1991-03-07', 'Cebu City', 'Female', 3, 1, 'Sales Clerk', 1, 'alive'),
(108, 'Rojas', 'Enrique', 'Navarro', '', '1990-10-20', 'Bacolod City', 'Male', 4, 1, 'Programmer', 1, 'alive'),
(109, 'Ortega', 'Lydia', 'Padilla', '', '1989-01-26', 'Legazpi City', 'Female', 1, 1, 'Secretary', 1, 'alive'),
(110, 'Pascual', 'Samuel', 'Delos Reyes', '', '1984-05-15', 'Quezon City', 'Male', 2, 2, 'Electrician', 1, 'alive'),
(111, 'Aguilar', 'Imelda', 'Garcia', '', '1992-07-09', 'Manila', 'Female', 3, 1, 'Waitress', 1, 'alive'),
(112, 'Rivera', 'Carlos', 'Castro', '', '1980-11-03', 'Pasig City', 'Male', 4, 4, 'Driver', 1, 'alive'),
(113, 'Gutierrez', 'Nora', 'Bautista', '', '1988-06-01', 'Baguio City', 'Female', 1, 5, 'Florist', 1, 'alive'),
(114, 'Domingo', 'Fernando', 'Salvador', '', '1993-09-13', 'Dumaguete City', 'Male', 2, 1, 'Plumber', 1, 'alive'),
(115, 'Magsaysay', 'Sylvia', 'Ocampo', '', '1987-12-24', 'Tagaytay', 'Female', 3, 1, 'Manager', 1, 'alive'),
(116, 'Velasco', 'Adrian', 'Martinez', '', '1990-02-18', 'Antipolo', 'Male', 4, 1, 'Chef', 1, 'alive'),
(117, 'Manalo', 'Ruby', 'Perez', '', '1986-05-08', 'Batangas City', 'Female', 1, 1, 'Teacher', 1, 'alive'),
(118, 'Lozano', 'Eduardo', 'Espinosa', '', '1979-10-12', 'Cebu City', 'Male', 2, 2, 'Accountant', 1, 'alive'),
(119, 'Medina', 'Diana', 'Rosales', '', '1994-01-20', 'General Santos', 'Female', 3, 1, 'Technician', 1, 'alive'),
(120, 'Cabrera', 'Arnold', 'Valdez', '', '1990-07-03', 'San Juan', 'Male', 4, 4, 'Electrician', 1, 'alive'),
(121, 'Dela Cruz', 'Juan', 'Santos', '', '1990-01-15', 'Manila', 'Male', 1, 1, 'Teacher', 1, 'alive'),
(122, 'Santos', 'Maria', 'Luna', '', '1985-07-22', 'Cebu City', 'Female', 2, 2, 'Nurse', 1, 'alive'),
(123, 'Reyes', 'Jose', 'Cruz', '', '1978-11-03', 'Davao City', 'Male', 3, 1, 'Engineer', 1, 'alive'),
(124, 'Garcia', 'Ana', 'Mendoza', '', '1992-03-18', 'Quezon City', 'Female', 4, 4, 'Accountant', 1, 'alive'),
(125, 'Morales', 'Luis', 'Ramos', '', '1980-12-25', 'Baguio City', 'Male', 1, 5, 'Police Officer', 1, 'alive'),
(127, 'Torres', 'Mark', 'Villanueva', '', '1988-09-30', 'Bacolod City', 'Male', 3, 1, 'Mechanic', 1, 'alive'),
(128, 'Lopez', 'Carla', 'Fernando', '', '1993-04-12', 'Dumaguete City', 'Female', 4, 1, 'Designer', 1, 'alive'),
(129, 'Gomez', 'Juanita', 'Cruz', '', '1982-08-19', 'General Santos', 'Female', 1, 1, 'Farmer', 1, 'alive'),
(130, 'Mendoza', 'Pedro', 'Santos', '', '1991-02-17', 'San Juan', 'Male', 2, 2, 'Fisherman', 1, 'alive'),
(131, 'Ramos', 'Lorena', 'Morales', '', '1987-05-10', 'Tagaytay', 'Female', 3, 1, 'Teacher', 1, 'alive'),
(132, 'Villanueva', 'Edgar', 'Garcia', '', '1975-10-29', 'Antipolo', 'Male', 4, 4, 'Driver', 1, 'alive'),
(133, 'Diaz', 'Clara', 'Torres', '', '1996-01-05', 'Batangas City', 'Female', 1, 5, 'Entrepreneur', 1, 'alive'),
(134, 'Cruz', 'Manuel', 'Gomez', '', '1984-07-21', 'Legazpi City', 'Male', 2, 1, 'Chef', 1, 'alive'),
(135, 'Santiago', 'Isabel', 'Fernandez', '', '1990-11-15', 'Ormoc', 'Female', 3, 1, 'Clerk', 1, 'alive'),
(136, 'Navarro', 'Miguel', 'Lopez', '', '1989-06-07', 'Naga City', 'Male', 4, 1, 'Artist', 1, 'alive'),
(137, 'Castro', 'Luisa', 'Santiago', '', '1986-09-25', 'Pasig City', 'Female', 1, 1, 'Engineer', 1, 'alive'),
(138, 'Delos Reyes', 'Victor', 'Mendoza', '', '1994-03-13', 'Lipa City', 'Male', 2, 2, 'Technician', 1, 'alive'),
(139, 'Aquino', 'Marissa', 'Ramos', '', '1993-08-31', 'Puerto Princesa', 'Female', 3, 1, 'Nurse', 1, 'alive'),
(140, 'De Leon', 'Roberto', 'Villanueva', '', '1979-12-09', 'Valenzuela', 'Male', 4, 4, 'Architect', 1, 'alive'),
(141, 'Padilla', 'Elsa', 'Dela Cruz', '', '1990-04-15', 'Cagayan de Oro', 'Female', 1, 5, 'Seamstress', 1, 'alive'),
(142, 'Bautista', 'Lorenzo', 'Santos', '', '1987-01-12', 'Baguio City', 'Male', 2, 1, 'Businessman', 1, 'alive'),
(143, 'Salvador', 'Clarita', 'Reyes', '', '1983-07-05', 'Manila', 'Female', 3, 1, 'Pharmacist', 1, 'alive'),
(144, 'Ocampo', 'Henry', 'Gomez', '', '1981-10-23', 'Makati', 'Male', 4, 1, 'Carpenter', 1, 'alive'),
(145, 'Martinez', 'Gloria', 'Diaz', '', '1992-02-14', 'Cebu City', 'Female', 1, 1, 'Teacher', 1, 'alive'),
(146, 'Perez', 'Julio', 'Lopez', '', '1985-06-11', 'Tagbilaran', 'Male', 2, 2, 'Electrician', 1, 'alive'),
(147, 'Espinosa', 'Cecilia', 'Fernandez', '', '1978-08-15', 'Zamboanga', 'Female', 3, 1, 'Cashier', 1, 'alive'),
(148, 'Rosales', 'Diego', 'Cruz', '', '1990-05-03', 'San Fernando', 'Male', 4, 4, 'Plumber', 1, 'alive'),
(149, 'Valdez', 'Teresa', 'Morales', '', '1995-09-17', 'Davao City', 'Female', 1, 5, 'Barista', 1, 'alive'),
(150, 'Alvarez', 'Antonio', 'Torres', '', '1983-11-29', 'Iloilo City', 'Male', 2, 1, 'Chef', 1, 'alive'),
(151, 'Garcia', 'Melinda', 'Aquino', '', '1991-03-07', 'Cebu City', 'Female', 3, 1, 'Sales Clerk', 1, 'alive'),
(152, 'Rojas', 'Enrique', 'Navarro', '', '1990-10-20', 'Bacolod City', 'Male', 4, 1, 'Programmer', 1, 'alive'),
(153, 'Ortega', 'Lydia', 'Padilla', '', '1989-01-26', 'Legazpi City', 'Female', 1, 1, 'Secretary', 1, 'alive'),
(154, 'Pascual', 'Samuel', 'Delos Reyes', '', '1984-05-15', 'Quezon City', 'Male', 2, 2, 'Electrician', 1, 'alive'),
(156, 'Rivera', 'Carlos', 'Castro', '', '1980-11-03', 'Pasig City', 'Male', 4, 4, 'Driver', 1, 'alive'),
(157, 'Gutierrez', 'Nora', 'Bautista', '', '1988-06-01', 'Baguio City', 'Female', 1, 5, 'Florist', 1, 'alive'),
(158, 'Domingo', 'Fernando', 'Salvador', '', '1993-09-13', 'Dumaguete City', 'Male', 2, 1, 'Plumber', 1, 'alive'),
(159, 'Magsaysay', 'Sylvia', 'Ocampo', '', '1987-12-24', 'Tagaytay', 'Female', 3, 1, 'Manager', 1, 'alive'),
(160, 'Velasco', 'Adrian', 'Martinez', '', '1990-02-18', 'Antipolo', 'Male', 4, 1, 'Chef', 1, 'alive'),
(161, 'Manalo', 'Ruby', 'Perez', '', '1986-05-08', 'Batangas City', 'Female', 1, 1, 'Teacher', 1, 'alive'),
(162, 'Lozano', 'Eduardo', 'Espinosa', '', '1979-10-12', 'Cebu City', 'Male', 2, 2, 'Accountant', 1, 'alive'),
(163, 'Medina', 'Diana', 'Rosales', '', '1994-01-20', 'General Santos', 'Female', 3, 1, 'Technician', 1, 'alive'),
(164, 'Cabrera', 'Arnold', 'Valdez', '', '1990-07-03', 'San Juan', 'Male', 4, 4, 'Electrician', 1, 'alive'),
(165, 'Johnson', 'Emma', 'Smith', 'Jr.', '1992-04-12', 'Newport', 'Female', 2, 1, 'Teacher', 1, 'alive'),
(166, 'Brown', 'Michael', 'Williams', NULL, '1987-11-23', 'Springfield', 'Male', 1, 2, 'Engineer', 1, 'alive'),
(167, 'Davis', 'Sophia', 'Jones', 'Sr.', '1975-06-14', 'Greenville', 'Female', 3, 5, 'Doctor', 1, 'alive'),
(168, 'Garcia', 'James', 'Martinez', 'III', '1990-08-19', 'Riverside', 'Male', 4, 1, 'Police Officer', 1, 'alive'),
(169, 'Martinez', 'Isabella', 'Taylor', NULL, '1982-02-28', 'Hillcrest', 'Female', 2, 1, 'Entrepreneur', 1, 'alive'),
(170, 'Hernandez', 'Ethan', 'Anderson', 'IV', '1969-07-15', 'Lakeside', 'Male', 1, 1, 'Mechanic', 1, 'alive'),
(171, 'Lopez', 'Mia', 'Thomas', NULL, '1995-12-03', 'Maplewood', 'Female', 3, 1, 'Nurse', 1, 'alive'),
(172, 'Clark', 'Liam', 'Lee', 'Jr.', '1988-05-10', 'Brookhaven', 'Male', 4, 4, 'Software Developer', 1, 'alive'),
(173, 'White', 'Ava', 'Walker', 'III', '1991-09-17', 'Willow Creek', 'Female', 2, 1, 'Chef', 1, 'alive'),
(174, 'Harris', 'Oliver', 'Hall', NULL, '1980-01-22', 'Silverlake', 'Male', 1, 2, 'Driver', 1, 'alive'),
(175, 'Bautista', 'Ricardo', 'Santos', '', '2000-05-15', 'Manila', 'Male', 1, 1, 'Student', 1, 'alive'),
(176, 'Santos', 'Maricel', 'Luna', '', '2001-07-22', 'Cebu City', 'Female', 2, 1, 'Student', 1, 'alive'),
(177, 'Reyes', 'Jayson', 'Cruz', '', '2002-11-03', 'Davao City', 'Male', 3, 1, 'Student', 1, 'alive'),
(178, 'Garcia', 'Amelia', 'Mendoza', '', '2003-03-18', 'Quezon City', 'Female', 4, 1, 'Student', 1, 'alive'),
(179, 'Morales', 'Paulo', 'Ramos', '', '2004-12-25', 'Baguio City', 'Male', 1, 1, 'Student', 1, 'alive'),
(180, 'Fernandez', 'Claire', 'Diaz', '', '2005-06-08', 'Iloilo City', 'Female', 2, 1, 'Student', 1, 'alive'),
(181, 'Torres', 'Noel', 'Villanueva', '', '2006-09-30', 'Bacolod City', 'Male', 3, 1, 'Student', 1, 'alive'),
(182, 'Lopez', 'Gina', 'Fernando', '', '2007-04-12', 'Dumaguete City', 'Female', 4, 1, 'Student', 1, 'alive'),
(183, 'Gomez', 'Joel', 'Cruz', '', '2008-08-19', 'General Santos', 'Male', 1, 1, 'Student', 1, 'alive'),
(184, 'Mendoza', 'Diana', 'Santos', '', '2009-02-17', 'San Juan', 'Female', 2, 1, 'Student', 1, 'alive'),
(185, 'Ramos', 'Carlo', 'Morales', '', '2010-05-10', 'Tagaytay', 'Male', 3, 1, 'Student', 1, 'alive'),
(186, 'Villanueva', 'Angel', 'Garcia', '', '2011-10-29', 'Antipolo', 'Female', 4, 1, 'Student', 1, 'alive'),
(187, 'Diaz', 'Marco', 'Torres', '', '2012-01-05', 'Batangas City', 'Male', 1, 1, 'Student', 1, 'alive'),
(188, 'Cruz', 'Elaine', 'Gomez', '', '2013-07-21', 'Legazpi City', 'Female', 2, 1, 'Student', 1, 'alive'),
(189, 'Santiago', 'Ryan', 'Fernandez', '', '2014-11-15', 'Ormoc', 'Male', 3, 1, 'Student', 1, 'alive'),
(190, 'Navarro', 'Mia', 'Lopez', '', '2015-06-07', 'Naga City', 'Female', 4, 1, 'Student', 1, 'alive'),
(191, 'Castro', 'Luke', 'Santiago', '', '2016-09-25', 'Pasig City', 'Male', 1, 1, 'Student', 1, 'alive'),
(192, 'Delos Reyes', 'Sophia', 'Mendoza', '', '2017-03-13', 'Lipa City', 'Female', 2, 1, 'Student', 1, 'alive'),
(193, 'Aquino', 'Jacob', 'Ramos', '', '2018-08-31', 'Puerto Princesa', 'Male', 3, 1, 'Student', 1, 'alive'),
(194, 'De Leon', 'Ella', 'Villanueva', '', '2019-12-09', 'Valenzuela', 'Female', 4, 1, 'Student', 1, 'alive'),
(195, 'Padilla', 'Victor', 'Dela Cruz', '', '2020-04-15', 'Cagayan de Oro', 'Male', 1, 1, 'Student', 1, 'alive'),
(196, 'Bautista', 'Hannah', 'Santos', '', '2021-01-12', 'Baguio City', 'Female', 2, 1, 'Student', 1, 'alive'),
(197, 'Salvador', 'Nathan', 'Reyes', '', '2022-07-05', 'Manila', 'Male', 3, 1, 'Student', 1, 'alive'),
(198, 'Ocampo', 'Leah', 'Gomez', '', '2023-10-23', 'Makati', 'Female', 4, 1, 'Student', 1, 'alive'),
(199, 'Martinez', 'Ivan', 'Diaz', '', '2000-02-14', 'Cebu City', 'Male', 1, 1, 'Student', 1, 'alive'),
(200, 'Perez', 'Alyssa', 'Lopez', '', '2001-06-11', 'Tagbilaran', 'Female', 2, 1, 'Student', 1, 'alive'),
(201, 'Espinosa', 'Brian', 'Fernandez', '', '2002-08-15', 'Zamboanga', 'Male', 3, 1, 'Student', 1, 'alive'),
(202, 'Rosales', 'Jade', 'Cruz', '', '2003-05-03', 'San Fernando', 'Female', 4, 1, 'Student', 1, 'alive'),
(203, 'Valdez', 'Ethan', 'Morales', '', '2004-09-17', 'Davao City', 'Male', 1, 1, 'Student', 1, 'alive'),
(204, 'Alvarez', 'Megan', 'Torres', '', '2005-11-29', 'Iloilo City', 'Female', 2, 1, 'Student', 1, 'alive'),
(205, 'Garcia', 'Kyle', 'Aquino', '', '2006-03-07', 'Cebu City', 'Male', 3, 1, 'Student', 1, 'alive'),
(206, 'Rojas', 'Nicole', 'Navarro', '', '2007-10-20', 'Bacolod City', 'Female', 4, 1, 'Student', 1, 'alive'),
(207, 'Ortega', 'Sean', 'Padilla', '', '2008-01-26', 'Legazpi City', 'Male', 1, 1, 'Student', 1, 'alive'),
(208, 'Pascual', 'Cindy', 'Delos Reyes', '', '2009-05-15', 'Quezon City', 'Female', 2, 1, 'Student', 1, 'alive'),
(209, 'Aguilar', 'Liam', 'Garcia', '', '2010-07-09', 'Manila', 'Male', 3, 1, 'Student', 1, 'alive'),
(210, 'Rivera', 'Erin', 'Castro', '', '2011-11-03', 'Pasig City', 'Female', 4, 1, 'Student', 1, 'alive'),
(211, 'Gutierrez', 'Josh', 'Bautista', '', '2012-06-01', 'Baguio City', 'Male', 1, 1, 'Student', 1, 'alive'),
(212, 'Domingo', 'Tina', 'Salvador', '', '2013-09-13', 'Dumaguete City', 'Female', 2, 1, 'Student', 1, 'alive'),
(213, 'Magsaysay', 'Kevin', 'Ocampo', '', '2014-12-24', 'Tagaytay', 'Male', 3, 1, 'Student', 1, 'alive'),
(214, 'Velasco', 'Bella', 'Martinez', '', '2015-02-18', 'Antipolo', 'Female', 4, 1, 'Student', 1, 'alive'),
(215, 'Reyes', 'Ethan', 'Cooper', 'Jr.', '1983-05-15', 'Hilltop', 'Male', 3, 1, 'Artist', 1, 'alive'),
(216, 'Scott', 'Emily', 'Cruz', NULL, '1997-07-25', 'Pineville', 'Female', 4, 1, 'Clerk', 1, 'alive'),
(217, 'Carter', 'Daniel', 'Reyes', 'Sr.', '1979-11-18', 'Riverwood', 'Male', 2, 5, 'Electrician', 1, 'alive'),
(218, 'Turner', 'Sophia', 'Young', NULL, '1992-03-08', 'Elmwood', 'Female', 1, 2, 'Farmer', 1, 'alive'),
(219, 'Torres', 'Lucas', 'Clark', NULL, '1985-10-20', 'Woodcrest', 'Male', 3, 4, 'Firefighter', 1, 'alive'),
(220, 'Brooks', 'Olivia', 'Perez', NULL, '1998-06-14', 'Oakwood', 'Female', 4, 1, 'Chef', 1, 'alive'),
(221, 'Bennett', 'Henry', 'Flores', 'III', '1991-12-02', 'Mapleton', 'Male', 1, 1, 'Driver', 1, 'alive'),
(222, 'Jenkins', 'Chloe', 'Diaz', 'IV', '1989-09-05', 'Fairview', 'Female', 2, 1, 'Nurse', 1, 'alive'),
(223, 'Long', 'Mason', 'Gutierrez', 'III', '1974-02-17', 'Lakeside', 'Male', 4, 1, 'Police Officer', 1, 'alive'),
(224, 'Crawford', 'Emma', 'Hernandez', NULL, '1986-11-23', 'Riverside', 'Female', 3, 2, 'Software Developer', 1, 'alive'),
(225, 'Morales', 'Liam', 'Gonzalez', 'Jr.', '1990-04-10', 'Brookhaven', 'Male', 4, 1, 'Engineer', 1, 'alive'),
(226, 'Griffin', 'Sophia', 'Sanchez', NULL, '1994-08-19', 'Hilltop', 'Female', 1, 1, 'Doctor', 1, 'alive'),
(227, 'Wells', 'Logan', 'Gomez', 'Sr.', '1981-06-29', 'Willow Creek', 'Male', 2, 5, 'Teacher', 1, 'alive'),
(228, 'Richards', 'Ella', 'Perry', NULL, '1993-03-07', 'Silverlake', 'Female', 3, 1, 'Mechanic', 1, 'alive'),
(229, 'Alexander', 'Aiden', 'Ramirez', 'III', '1976-10-15', 'Greenville', 'Male', 4, 1, 'Farmer', 1, 'alive'),
(230, 'Daniels', 'Charlotte', 'Kim', NULL, '1999-12-11', 'Springfield', 'Female', 1, 1, 'Firefighter', 1, 'alive'),
(231, 'Palmer', 'Benjamin', 'Mendoza', 'IV', '1984-05-30', 'Maplewood', 'Male', 2, 2, 'Clerk', 1, 'alive'),
(232, 'Fisher', 'Amelia', 'Nguyen', NULL, '1978-09-27', 'Newport', 'Female', 3, 1, 'Entrepreneur', 1, 'alive'),
(233, 'Ellis', 'Jack', 'Ortiz', 'Sr.', '1982-07-03', 'Riverwood', 'Male', 4, 4, 'Police Officer', 1, 'alive'),
(234, 'Jordan', 'Scarlett', 'Reed', 'III', '1989-02-22', 'Hillcrest', 'Female', 1, 5, 'Software Developer', 1, 'alive'),
(235, 'Harper', 'Levi', 'Peterson', NULL, '1996-06-18', 'Elmwood', 'Male', 2, 1, 'Doctor', 1, 'alive'),
(236, 'Cooper', 'Grace', 'Collins', NULL, '1990-01-15', 'Willow Creek', 'Female', 3, 1, 'Engineer', 1, 'alive'),
(237, 'Hughes', 'Wyatt', 'Carter', 'IV', '1983-08-24', 'Lakeside', 'Male', 4, 1, 'Teacher', 1, 'alive'),
(238, 'Ward', 'Lily', 'Howard', NULL, '1995-03-28', 'Pineville', 'Female', 1, 2, 'Electrician', 1, 'alive'),
(239, 'Sanders', 'Luke', 'Brooks', NULL, '1987-12-20', 'Oakwood', 'Male', 2, 1, 'Artist', 1, 'alive'),
(240, 'Ford', 'Aubrey', 'Russell', 'III', '1973-09-12', 'Fairview', 'Female', 3, 4, 'Farmer', 1, 'alive'),
(241, 'Jenkins', 'Matthew', 'Bennett', 'Jr.', '1988-04-06', 'Riverside', 'Male', 4, 5, 'Firefighter', 1, 'alive'),
(242, 'Perry', 'Hannah', 'Sullivan', NULL, '1991-10-03', 'Mapleton', 'Female', 1, 1, 'Nurse', 1, 'alive'),
(243, 'Powell', 'Oliver', 'Griffin', 'Sr.', '1985-01-26', 'Brookhaven', 'Male', 2, 1, 'Driver', 1, 'alive'),
(244, 'Santos', 'Manuel', 'Cruz', 'Sr.', '1945-03-15', 'Quezon City', 'Male', 2, 5, 'Retired Teacher', 1, 'alive'),
(245, 'Flores', 'Maria', 'Gomez', NULL, '1949-07-22', 'Davao City', 'Female', 3, 1, 'Retired Nurse', 1, 'alive'),
(246, 'Reyes', 'Antonio', 'Rivera', 'III', '1958-11-30', 'Manila', 'Male', 4, 2, 'Retired Engineer', 1, 'alive'),
(247, 'Delos Santos', 'Dolores', 'Diaz', 'IV', '1955-01-10', 'Cebu City', 'Female', 1, 1, 'Retired Farmer', 1, 'alive'),
(248, 'Villanueva', 'Enrique', 'Lopez', NULL, '1942-05-08', 'Zamboanga', 'Male', 3, 1, 'Retired Driver', 1, 'alive'),
(249, 'Marquez', 'Juanita', 'Fernandez', NULL, '1952-10-25', 'Baguio City', 'Female', 2, 1, 'Retired Entrepreneur', 1, 'alive'),
(250, 'Gutierrez', 'Rogelio', 'Salvador', 'Jr.', '1950-06-05', 'Vigan', 'Male', 4, 4, 'Retired Police Officer', 1, 'alive'),
(251, 'Pascual', 'Lourdes', 'Morales', NULL, '1954-12-11', 'Caloocan', 'Female', 1, 1, 'Retired Clerk', 1, 'alive'),
(252, 'Aguilar', 'Isidro', 'Martinez', 'Sr.', '1947-09-18', 'Pasay City', 'Male', 2, 5, 'Retired Electrician', 1, 'alive'),
(253, 'Cabrera', 'Leonor', 'De Guzman', 'III', '1948-04-14', 'Tagaytay', 'Female', 3, 1, 'Retired Doctor', 1, 'alive'),
(254, 'Rivera', 'Felipe', 'Cruz', NULL, '1944-08-29', 'Malolos', 'Male', 4, 1, 'Retired Chef', 1, 'alive'),
(261, 'Oras', 'Borongan', 'Sulat', 'asdasdas', '2025-03-14', 'Oras', 'male', 1, 1, 'dasdasdas', 1, 'alive'),
(262, '123', '123', '123', '123', '2025-03-10', 'Oras', 'male', 1, 1, 'Retired', 1, 'alive'),
(263, 'Oras', 'Eastern', 'Samar', '', '1945-02-16', 'Borongan City', 'male', 1, 1, '', 2, 'alive');

-- --------------------------------------------------------

--
-- Stand-in structure for view `barangayinhabitantsfull`
-- (See below for the actual view)
--
CREATE TABLE `barangayinhabitantsfull` (
`ResidentID` int(11)
,`LastName` varchar(255)
,`GivenName` varchar(255)
,`MiddleName` varchar(255)
,`Qualifier` varchar(255)
,`DateOfBirth` date
,`Address` text
,`PlaceOfBirth` varchar(255)
,`Sex` varchar(10)
,`CivilStatus` varchar(255)
,`Occupation` varchar(255)
,`Citizenship` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `barangayinhabitantsfulls`
-- (See below for the actual view)
--
CREATE TABLE `barangayinhabitantsfulls` (
`ResidentID` int(11)
,`LastName` varchar(255)
,`GivenName` varchar(255)
,`MiddleName` varchar(255)
,`Qualifier` varchar(255)
,`DateOfBirth` date
,`Address` text
,`PlaceOfBirth` varchar(255)
,`Sex` varchar(10)
,`CivilStatus` varchar(255)
,`OccupationID` varchar(256)
,`Citizenship` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `barangayinhabitantsfulls1`
-- (See below for the actual view)
--
CREATE TABLE `barangayinhabitantsfulls1` (
`ResidentID` int(11)
,`LastName` varchar(255)
,`GivenName` varchar(255)
,`MiddleName` varchar(255)
,`Qualifier` varchar(255)
,`DateOfBirth` date
,`Address` text
,`PlaceOfBirth` varchar(255)
,`Sex` varchar(10)
,`CivilStatus` varchar(255)
,`OccupationID` varchar(256)
,`Citizenship` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `barangayinhabitantsfulls2`
-- (See below for the actual view)
--
CREATE TABLE `barangayinhabitantsfulls2` (
`ResidentID` int(11)
,`LastName` varchar(255)
,`GivenName` varchar(255)
,`MiddleName` varchar(255)
,`Qualifier` varchar(255)
,`DateOfBirth` date
,`Address` text
,`PlaceOfBirth` varchar(255)
,`Sex` varchar(10)
,`CivilStatus` varchar(255)
,`Occupation` varchar(256)
,`Citizenship` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `barangayinhabitantsfulls3`
-- (See below for the actual view)
--
CREATE TABLE `barangayinhabitantsfulls3` (
`ResidentID` int(11)
,`LastName` varchar(255)
,`GivenName` varchar(255)
,`MiddleName` varchar(255)
,`Qualifier` varchar(255)
,`DateOfBirth` date
,`Address` text
,`PlaceOfBirth` varchar(255)
,`Sex` varchar(10)
,`CivilStatus` varchar(255)
,`Occupation` varchar(256)
,`Citizenship` int(11)
,`status` enum('alive','deceased')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `barangay_inhabitants_view`
-- (See below for the actual view)
--
CREATE TABLE `barangay_inhabitants_view` (
`name` text
,`CivilStatus` varchar(255)
,`DateOfBirth` date
,`PlaceOfBirth` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `barangay_inhabitants_view1`
-- (See below for the actual view)
--
CREATE TABLE `barangay_inhabitants_view1` (
`name` text
,`CivilStatus` varchar(255)
,`BirthDay` varchar(73)
,`PlaceOfBirth` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `citizenship`
--

CREATE TABLE `citizenship` (
  `CitizenshipID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizenship`
--

INSERT INTO `citizenship` (`CitizenshipID`, `Name`) VALUES
(1, 'Filipino'),
(2, 'American'),
(3, 'Chinese'),
(4, 'German'),
(5, 'Afghan'),
(6, 'Albanian'),
(7, 'Algerian'),
(8, 'Andorran'),
(9, 'Angolan'),
(10, 'Argentine'),
(11, 'Armenian'),
(12, 'Australian'),
(13, 'Austrian'),
(14, 'Azerbaijani'),
(15, 'Bahamian'),
(16, 'Bahraini'),
(17, 'Bangladeshi'),
(18, 'Barbadian'),
(19, 'Belarusian'),
(20, 'Belgian'),
(21, 'Belizean'),
(22, 'Beninese'),
(23, 'Bhutanese'),
(24, 'Bolivian'),
(25, 'Bosnian'),
(26, 'Botswanan'),
(27, 'Brazilian'),
(28, 'British'),
(29, 'Bruneian'),
(30, 'Bulgarian'),
(31, 'Burkinabe'),
(32, 'Burmese'),
(33, 'Burundian'),
(34, 'Cambodian'),
(35, 'Cameroonian'),
(36, 'Canadian'),
(37, 'Cape Verdean'),
(38, 'Central African'),
(39, 'Chadian'),
(40, 'Chilean'),
(41, 'Colombian'),
(42, 'Comorian'),
(43, 'Congolese'),
(44, 'Costa Rican'),
(45, 'Croatian'),
(46, 'Cuban'),
(47, 'Cypriot'),
(48, 'Czech'),
(49, 'Danish'),
(50, 'Djiboutian'),
(51, 'Dominican'),
(52, 'Dutch'),
(53, 'East Timorese'),
(54, 'Ecuadorean'),
(55, 'Egyptian'),
(56, 'Emirati'),
(57, 'Equatorial Guinean'),
(58, 'Eritrean'),
(59, 'Estonian'),
(60, 'Eswatini'),
(61, 'Ethiopian'),
(62, 'Fijian'),
(63, 'Finnish'),
(64, 'French'),
(65, 'Gabonese'),
(66, 'Gambian'),
(67, 'Georgian'),
(68, 'Ghanaian'),
(69, 'Greek'),
(70, 'Grenadian'),
(71, 'Guatemalan'),
(72, 'Guinean'),
(73, 'Guyanese'),
(74, 'Haitian'),
(75, 'Honduran'),
(76, 'Hungarian'),
(77, 'Icelandic'),
(78, 'Indian'),
(79, 'Indonesian'),
(80, 'Iranian'),
(81, 'Iraqi'),
(82, 'Irish'),
(83, 'Israeli'),
(84, 'Italian'),
(85, 'Ivorian'),
(86, 'Jamaican'),
(87, 'Japanese'),
(88, 'Jordanian'),
(89, 'Kazakhstani'),
(90, 'Kenyan'),
(91, 'Kiribati'),
(92, 'Kuwaiti'),
(93, 'Kyrgyzstani'),
(94, 'Laotian'),
(95, 'Latvian'),
(96, 'Lebanese'),
(97, 'Lesotho'),
(98, 'Liberian'),
(99, 'Libyan'),
(100, 'Liechtensteiner'),
(101, 'Lithuanian'),
(102, 'Luxembourgish'),
(103, 'Malagasy'),
(104, 'Malawian'),
(105, 'Malaysian'),
(106, 'Maldivian'),
(107, 'Malian'),
(108, 'Maltese'),
(109, 'Marshallese'),
(110, 'Mauritanian'),
(111, 'Mauritian'),
(112, 'Mexican'),
(113, 'Micronesian'),
(114, 'Moldovan'),
(115, 'Monacan'),
(116, 'Mongolian'),
(117, 'Montenegrin'),
(118, 'Moroccan'),
(119, 'Mozambican'),
(120, 'Namibian'),
(121, 'Nauruan'),
(122, 'Nepalese'),
(123, 'New Zealander'),
(124, 'Nicaraguan'),
(125, 'Nigerian'),
(126, 'North Korean'),
(127, 'North Macedonian'),
(128, 'Norwegian'),
(129, 'Omani'),
(130, 'Pakistani'),
(131, 'Palauan'),
(132, 'Palestinian'),
(133, 'Panamanian'),
(134, 'Papua New Guinean'),
(135, 'Paraguayan'),
(136, 'Peruvian'),
(137, 'Polish'),
(138, 'Portuguese'),
(139, 'Qatari'),
(140, 'Romanian'),
(141, 'Russian'),
(142, 'Rwandan'),
(143, 'Saint Lucian'),
(144, 'Salvadoran'),
(145, 'Samoan'),
(146, 'Saudi'),
(147, 'Senegalese'),
(148, 'Serbian'),
(149, 'Seychellois'),
(150, 'Singaporean'),
(151, 'Slovak'),
(152, 'Slovenian'),
(153, 'Solomon Islander'),
(154, 'Somali'),
(155, 'South African'),
(156, 'South Korean'),
(157, 'South Sudanese'),
(158, 'Spanish'),
(159, 'Sri Lankan'),
(160, 'Sudanese'),
(161, 'Surinamese'),
(162, 'Swazi'),
(163, 'Swedish'),
(164, 'Swiss'),
(165, 'Syrian'),
(166, 'Tajikistani'),
(167, 'Tanzanian'),
(168, 'Thai'),
(169, 'Togolese'),
(170, 'Tongan'),
(171, 'Tunisian'),
(172, 'Turkish'),
(173, 'Turkmen'),
(174, 'Tuvaluan'),
(175, 'Ugandan'),
(176, 'Ukrainian'),
(177, 'Uruguayan'),
(178, 'Uzbekistani'),
(179, 'Vanuatuan'),
(180, 'Vatican'),
(181, 'Venezuelan'),
(182, 'Vietnamese'),
(183, 'Yemeni'),
(184, 'Zambian'),
(185, 'Zimbabwean');

-- --------------------------------------------------------

--
-- Table structure for table `civilstatus`
--

CREATE TABLE `civilstatus` (
  `CivilStatusID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `civilstatus`
--

INSERT INTO `civilstatus` (`CivilStatusID`, `Name`) VALUES
(1, 'Single'),
(2, 'Married'),
(4, 'Separated'),
(5, 'Widowed');

-- --------------------------------------------------------

--
-- Table structure for table `highesteducationalattainment`
--

CREATE TABLE `highesteducationalattainment` (
  `HighestEducationalAttainmentID` int(11) NOT NULL,
  `HighestEducationalAttainmentName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `highesteducationalattainment`
--

INSERT INTO `highesteducationalattainment` (`HighestEducationalAttainmentID`, `HighestEducationalAttainmentName`) VALUES
(1, 'Elementary Level'),
(2, 'Elementary Grad'),
(3, 'Highschool Level'),
(4, 'Highschool Grad'),
(5, 'Vocational Grad'),
(6, 'College Level'),
(7, 'College Grad'),
(8, 'Masters Level'),
(9, 'Masters Grad'),
(10, 'Doctorate Level'),
(11, 'Doctorate Grad');

-- --------------------------------------------------------

--
-- Table structure for table `household`
--

CREATE TABLE `household` (
  `HouseholdNumber` int(11) NOT NULL,
  `AddressID` int(11) DEFAULT NULL,
  `TotalInhabitants` int(11) NOT NULL,
  `HouseholdHead` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `household`
--

INSERT INTO `household` (`HouseholdNumber`, `AddressID`, `TotalInhabitants`, `HouseholdHead`) VALUES
(1, 1, 4, 223),
(2, 2, 6, 76),
(3, 1, 6, 77),
(4, 3, 8, 78),
(5, 1, 1, 79),
(6, 4, 1, 80),
(7, 1, 2, 81),
(8, 1, 3, 82),
(9, 2, 1, 83),
(10, 1, 3, 84),
(11, 3, 6, 85),
(12, 1, 7, 86),
(13, 4, 4, 87),
(14, 1, 1, 88),
(15, 2, 4, 89),
(16, 1, 1, 90),
(17, 3, 2, 91),
(18, 1, 2, 92),
(19, 4, 4, 93),
(20, 1, 5, 94),
(21, 2, 7, 95),
(22, 1, 5, 96),
(23, 3, 8, 97),
(24, 1, 4, 98),
(25, 4, 2, 99),
(26, 1, 4, 100),
(27, 2, 6, 101),
(28, 1, 7, 102),
(29, 3, 4, 103),
(30, 1, 3, 104),
(31, 4, 2, 105),
(32, 1, 4, 106),
(33, 2, 1, 107),
(34, 1, 2, 108),
(35, 3, 4, 109),
(36, 1, 5, 110),
(37, 4, 2, 111),
(38, 1, 3, 112),
(39, 2, 5, 113),
(40, 1, 1, 114),
(41, 3, 5, 115),
(42, 1, 4, 116),
(43, 4, 4, 117),
(44, 1, 6, 118),
(45, 2, 9, 120),
(46, 1, 5, 121),
(47, 3, 8, 122),
(48, 1, 12, 123),
(49, 4, 6, 124),
(50, 1, 4, 125);

-- --------------------------------------------------------

--
-- Stand-in structure for view `householdmembers`
-- (See below for the actual view)
--
CREATE TABLE `householdmembers` (
`Id` int(11)
,`HouseholdNumber` int(11)
,`FullName` text
,`Sex` varchar(10)
,`DateOfBirth` date
,`CivilStatus` varchar(255)
,`Citizenship` varchar(255)
,`Occupation` varchar(255)
,`RelationToHead` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `householdmembers1`
-- (See below for the actual view)
--
CREATE TABLE `householdmembers1` (
`HouseholdNumber` int(11)
,`FullName` text
,`Sex` varchar(10)
,`DateOfBirth` date
,`CivilStatus` varchar(255)
,`Citizenship` varchar(255)
,`OccupationID` varchar(256)
,`RelationToHead` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `householdmembers2`
-- (See below for the actual view)
--
CREATE TABLE `householdmembers2` (
`HouseholdMembershipID` int(11)
,`HouseholdNumber` int(11)
,`FullName` text
,`Sex` varchar(10)
,`DateOfBirth` date
,`CivilStatus` varchar(255)
,`Citizenship` varchar(255)
,`OccupationID` varchar(256)
,`RelationToHead` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `householdmembership`
--

CREATE TABLE `householdmembership` (
  `HouseholdMembershipID` int(11) NOT NULL,
  `ResidentID` int(11) DEFAULT NULL,
  `HouseholdNumber` int(11) DEFAULT NULL,
  `RelationID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `householdmembership`
--

INSERT INTO `householdmembership` (`HouseholdMembershipID`, `ResidentID`, `HouseholdNumber`, `RelationID`) VALUES
(18, 248, 1, 2),
(30, 76, 1, 11),
(164, 209, 7, 12),
(165, 229, 3, 1),
(167, 204, 5, 14),
(168, 252, 3, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `householdsfull`
-- (See below for the actual view)
--
CREATE TABLE `householdsfull` (
`HouseholdNumber` int(11)
,`Address` text
,`TotalInhabitants` int(11)
,`HouseholdHead` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `householdtracker`
-- (See below for the actual view)
--
CREATE TABLE `householdtracker` (
`HouseholdNumber` int(11)
,`Name` varchar(29)
);

-- --------------------------------------------------------

--
-- Table structure for table `kkattendance`
--

CREATE TABLE `kkattendance` (
  `ID` int(11) NOT NULL,
  `KKMemberID` int(11) DEFAULT NULL,
  `HasAttendedKKAssembly` tinyint(1) NOT NULL,
  `KKAssemblyAttendanceCount` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kkmembers`
--

CREATE TABLE `kkmembers` (
  `KKMemberID` int(11) NOT NULL,
  `ResidentID` int(11) DEFAULT NULL,
  `YouthClassification` int(11) DEFAULT NULL,
  `YouthAgeGroup` int(11) DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `EmailAddress` varchar(255) DEFAULT NULL,
  `HighestEducationalAttainmentID` int(11) DEFAULT NULL,
  `WorkStatus` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kkmembers`
--

INSERT INTO `kkmembers` (`KKMemberID`, `ResidentID`, `YouthClassification`, `YouthAgeGroup`, `ContactNumber`, `EmailAddress`, `HighestEducationalAttainmentID`, `WorkStatus`) VALUES
(31, 238, 1, 3, '09827362718', 'fernnadez@gmail.com', 11, 1),
(51, 220, 1, 1, '123123', 'vincejerby@gmail.com', 1, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `kkmembersfull`
-- (See below for the actual view)
--
CREATE TABLE `kkmembersfull` (
`KKMemberID` int(11)
,`FullName` text
,`YouthClassification` varchar(255)
,`YouthAgeGroup` varchar(255)
,`ContactNumber` varchar(20)
,`EmailAddress` varchar(255)
,`HighestEducationalAttainment` varchar(255)
,`WorkStatus` varchar(255)
,`DateOfBirth` varchar(10)
);

-- --------------------------------------------------------

--
-- Table structure for table `luponrecords`
--

CREATE TABLE `luponrecords` (
  `Id` int(11) NOT NULL,
  `NameOfComplainant` varchar(255) NOT NULL,
  `NameOfComplaint` varchar(255) NOT NULL,
  `NameOfRespondents` varchar(255) NOT NULL,
  `ComplainDetails` text NOT NULL,
  `CaseNo` varchar(50) NOT NULL,
  `DateWritten` date NOT NULL,
  `IsResolve` varchar(12) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `luponrecords`
--

INSERT INTO `luponrecords` (`Id`, `NameOfComplainant`, `NameOfComplaint`, `NameOfRespondents`, `ComplainDetails`, `CaseNo`, `DateWritten`, `IsResolve`) VALUES
(1, 'Vince Jerby C. Oraya', 'PowerUPs', 'Some Person', 'Lorem Ipsum set Amet', '122644', '2024-12-14', 'No'),
(11, 'Christian Carlo White', 'assault', 'Colette', 'daniel assaulted a woman', 'Johann Sebastian O. Tadios', '1899-11-29', 'Yes'),
(12, 'Johann Sebastian Tadios', 'DUI', 'Maria Anderson', 'hit a post while driving', 'vince jerby', '2024-12-16', 'No'),
(13, 'Colette Gutierrez', 'noise complaint', 'johann Sebastian ', 'blasting loud music through the night', 'daniel a fuentes', '1899-11-29', 'No'),
(14, 'Juval Book', 'robbery', 'jhonalbert ybanez', 'robbed the house ', 'virgenette encio', '2024-12-15', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `occupation`
--

CREATE TABLE `occupation` (
  `OccupationID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `occupation`
--

INSERT INTO `occupation` (`OccupationID`, `Name`) VALUES
(1, 'Farmer'),
(2, 'Teacher'),
(3, 'Barangay Official'),
(4, 'Government Worker'),
(5, 'Carpenter'),
(6, 'Fishermen'),
(7, 'Student'),
(8, 'Helper');

-- --------------------------------------------------------

--
-- Table structure for table `relations`
--

CREATE TABLE `relations` (
  `RelationID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relations`
--

INSERT INTO `relations` (`RelationID`, `Name`) VALUES
(1, 'Father'),
(2, 'Mother'),
(3, 'Son'),
(4, 'Daughter'),
(5, 'Aunt'),
(6, 'Uncle'),
(7, 'Grandparent'),
(8, 'Grandson/Granddaughter'),
(9, 'Cousin'),
(10, 'Niece/Nephew'),
(11, 'Friend'),
(12, 'Spouse'),
(13, 'Brother'),
(14, 'Sister');

-- --------------------------------------------------------

--
-- Stand-in structure for view `residenttracker`
-- (See below for the actual view)
--
CREATE TABLE `residenttracker` (
`ResidentID` int(11)
,`Name` text
);

-- --------------------------------------------------------

--
-- Table structure for table `seniorcitizens`
--

CREATE TABLE `seniorcitizens` (
  `SeniorCitizenID` int(11) NOT NULL,
  `ResidentID` int(11) DEFAULT NULL,
  `SeniorCitizenNumber` varchar(255) NOT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seniorcitizens`
--

INSERT INTO `seniorcitizens` (`SeniorCitizenID`, `ResidentID`, `SeniorCitizenNumber`, `ContactNumber`, `Email`) VALUES
(19, 245, '2', '02918287472', 'flores@gmail.com'),
(20, 246, '3', '09514373832', 'reyes@gmail.com'),
(21, 247, '4', '09721537483', 'delossantos@gmail.com'),
(22, 248, '5', '09826372812', 'villanueva@gmail.com'),
(23, 249, '6', '09875251723', 'marquez@gmail.com'),
(24, 253, '7', '09726172635', 'gutierriez@gmail.com'),
(33, 263, '123123', '09150082319', 'vincejerby@gmail.com'),
(34, 250, '123123', '123123', 'vincejerby@gmail.com'),
(35, 252, '12312312', '123123', 'asdas@asdasds');

-- --------------------------------------------------------

--
-- Stand-in structure for view `seniorcitizensfull`
-- (See below for the actual view)
--
CREATE TABLE `seniorcitizensfull` (
`SeniorCitizenID` int(11)
,`FullName` text
,`SeniorCitizenNumber` varchar(255)
,`ContactNumber` varchar(20)
,`Email` varchar(255)
,`Address` text
,`CivilStatus` varchar(255)
,`Citizenship` varchar(255)
,`Occupation` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `seniorcitizensfull1`
-- (See below for the actual view)
--
CREATE TABLE `seniorcitizensfull1` (
`SeniorCitizenID` int(11)
,`FullName` text
,`SeniorCitizenNumber` varchar(255)
,`ContactNumber` varchar(20)
,`Email` varchar(255)
,`Address` text
,`CivilStatus` varchar(255)
,`Citizenship` varchar(255)
,`Occupation` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `seniorcitizensfull2`
-- (See below for the actual view)
--
CREATE TABLE `seniorcitizensfull2` (
`SeniorCitizenID` int(11)
,`FullName` text
,`SeniorCitizenNumber` varchar(255)
,`ContactNumber` varchar(20)
,`Email` varchar(255)
,`Address` text
,`CivilStatus` varchar(255)
,`Citizenship` varchar(255)
,`OccupationID` varchar(256)
,`DateOfBirth` date
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `usertype` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `usertype`) VALUES
(10, 'admin', '$2b$10$jVOkVOhFjttBukyoShiw3eTPwefGVlCEDaFtgUtc7vu.sQ7bQvgZm', 'admin'),
(57, 'BarangayOfficial1', '$2b$10$ANfMXdEzZaJofgCInkhUG.W2g6VRkLniNgFUzdyeM6CZRi4aQJQye', 'official'),
(58, 'BarangaySecretary', '$2b$10$soAlvtYYa7SHe89ACJocPOasz.7RVx2e4n8hlf8vfy/MZMqQIBuVC', 'secretary');

-- --------------------------------------------------------

--
-- Table structure for table `voterregistration`
--

CREATE TABLE `voterregistration` (
  `ID` int(11) NOT NULL,
  `KKMemberID` int(11) DEFAULT NULL,
  `IsRegisteredVoter` tinyint(1) NOT NULL,
  `IsRegisteredNationalVoter` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workstatus`
--

CREATE TABLE `workstatus` (
  `WorkStatusID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workstatus`
--

INSERT INTO `workstatus` (`WorkStatusID`, `Name`) VALUES
(1, 'Employed'),
(2, 'Unemployed'),
(3, 'Self-Employed'),
(4, 'Currently Looking for a Job'),
(5, 'Not Interested Looking for a Job');

-- --------------------------------------------------------

--
-- Table structure for table `youthagegroup`
--

CREATE TABLE `youthagegroup` (
  `YouthAgeGroupID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `youthagegroup`
--

INSERT INTO `youthagegroup` (`YouthAgeGroupID`, `Name`) VALUES
(1, 'Child Youth (15-17 Years Old)'),
(2, 'Core Youth (18-24 Years Old)'),
(3, 'Young Adult (24-30 Years Old)');

-- --------------------------------------------------------

--
-- Table structure for table `youthclassification`
--

CREATE TABLE `youthclassification` (
  `YouthClassificationID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `youthclassification`
--

INSERT INTO `youthclassification` (`YouthClassificationID`, `Name`) VALUES
(1, 'In School Youth'),
(2, 'Out of School Youth'),
(3, 'Working Youth'),
(4, 'Youth with Specific Needs');

-- --------------------------------------------------------

--
-- Structure for view `barangayinhabitantsfull`
--
DROP TABLE IF EXISTS `barangayinhabitantsfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `barangayinhabitantsfull`  AS SELECT `bi`.`ResidentID` AS `ResidentID`, `bi`.`LastName` AS `LastName`, `bi`.`GivenName` AS `GivenName`, `bi`.`MiddleName` AS `MiddleName`, `bi`.`Qualifier` AS `Qualifier`, `bi`.`DateOfBirth` AS `DateOfBirth`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `bi`.`PlaceOfBirth` AS `PlaceOfBirth`, `bi`.`Sex` AS `Sex`, `cs`.`Name` AS `CivilStatus`, `o`.`Name` AS `Occupation`, `c`.`Name` AS `Citizenship` FROM ((((`barangayinhabitants` `bi` left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `occupation` `o` on(`bi`.`OccupationID` = `o`.`OccupationID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `barangayinhabitantsfulls`
--
DROP TABLE IF EXISTS `barangayinhabitantsfulls`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `barangayinhabitantsfulls`  AS SELECT `bi`.`ResidentID` AS `ResidentID`, `bi`.`LastName` AS `LastName`, `bi`.`GivenName` AS `GivenName`, `bi`.`MiddleName` AS `MiddleName`, `bi`.`Qualifier` AS `Qualifier`, `bi`.`DateOfBirth` AS `DateOfBirth`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `bi`.`PlaceOfBirth` AS `PlaceOfBirth`, `bi`.`Sex` AS `Sex`, `cs`.`Name` AS `CivilStatus`, `bi`.`OccupationID` AS `OccupationID`, `c`.`Name` AS `Citizenship` FROM (((`barangayinhabitants` `bi` left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `barangayinhabitantsfulls1`
--
DROP TABLE IF EXISTS `barangayinhabitantsfulls1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `barangayinhabitantsfulls1`  AS SELECT `bi`.`ResidentID` AS `ResidentID`, `bi`.`LastName` AS `LastName`, `bi`.`GivenName` AS `GivenName`, `bi`.`MiddleName` AS `MiddleName`, `bi`.`Qualifier` AS `Qualifier`, `bi`.`DateOfBirth` AS `DateOfBirth`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `bi`.`PlaceOfBirth` AS `PlaceOfBirth`, `bi`.`Sex` AS `Sex`, `cs`.`Name` AS `CivilStatus`, `bi`.`OccupationID` AS `OccupationID`, `c`.`Name` AS `Citizenship` FROM (((`barangayinhabitants` `bi` left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `barangayinhabitantsfulls2`
--
DROP TABLE IF EXISTS `barangayinhabitantsfulls2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `barangayinhabitantsfulls2`  AS SELECT `bi`.`ResidentID` AS `ResidentID`, `bi`.`LastName` AS `LastName`, `bi`.`GivenName` AS `GivenName`, `bi`.`MiddleName` AS `MiddleName`, `bi`.`Qualifier` AS `Qualifier`, `bi`.`DateOfBirth` AS `DateOfBirth`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `bi`.`PlaceOfBirth` AS `PlaceOfBirth`, `bi`.`Sex` AS `Sex`, `cs`.`Name` AS `CivilStatus`, `bi`.`OccupationID` AS `Occupation`, `c`.`CitizenshipID` AS `Citizenship` FROM (((`barangayinhabitants` `bi` left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `barangayinhabitantsfulls3`
--
DROP TABLE IF EXISTS `barangayinhabitantsfulls3`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `barangayinhabitantsfulls3`  AS SELECT `bi`.`ResidentID` AS `ResidentID`, `bi`.`LastName` AS `LastName`, `bi`.`GivenName` AS `GivenName`, `bi`.`MiddleName` AS `MiddleName`, `bi`.`Qualifier` AS `Qualifier`, `bi`.`DateOfBirth` AS `DateOfBirth`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `bi`.`PlaceOfBirth` AS `PlaceOfBirth`, `bi`.`Sex` AS `Sex`, `cs`.`Name` AS `CivilStatus`, `bi`.`OccupationID` AS `Occupation`, `c`.`CitizenshipID` AS `Citizenship`, `bi`.`status` AS `status` FROM (((`barangayinhabitants` `bi` left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `barangay_inhabitants_view`
--
DROP TABLE IF EXISTS `barangay_inhabitants_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `barangay_inhabitants_view`  AS SELECT concat(`barangayinhabitants`.`GivenName`,' ',`barangayinhabitants`.`MiddleName`,' ',`barangayinhabitants`.`LastName`) AS `name`, `cs`.`Name` AS `CivilStatus`, `barangayinhabitants`.`DateOfBirth` AS `DateOfBirth`, `barangayinhabitants`.`PlaceOfBirth` AS `PlaceOfBirth` FROM (`barangayinhabitants` left join `civilstatus` `cs` on(`barangayinhabitants`.`CivilStatusID` = `cs`.`CivilStatusID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `barangay_inhabitants_view1`
--
DROP TABLE IF EXISTS `barangay_inhabitants_view1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `barangay_inhabitants_view1`  AS SELECT concat(`barangayinhabitants`.`GivenName`,' ',`barangayinhabitants`.`MiddleName`,' ',`barangayinhabitants`.`LastName`) AS `name`, `cs`.`Name` AS `CivilStatus`, date_format(`barangayinhabitants`.`DateOfBirth`,'%M %d, %Y') AS `BirthDay`, `barangayinhabitants`.`PlaceOfBirth` AS `PlaceOfBirth` FROM (`barangayinhabitants` left join `civilstatus` `cs` on(`barangayinhabitants`.`CivilStatusID` = `cs`.`CivilStatusID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `householdmembers`
--
DROP TABLE IF EXISTS `householdmembers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `householdmembers`  AS SELECT `hm`.`HouseholdMembershipID` AS `Id`, `hm`.`HouseholdNumber` AS `HouseholdNumber`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `FullName`, `bi`.`Sex` AS `Sex`, `bi`.`DateOfBirth` AS `DateOfBirth`, `cs`.`Name` AS `CivilStatus`, `c`.`Name` AS `Citizenship`, `o`.`Name` AS `Occupation`, `r`.`Name` AS `RelationToHead` FROM (((((`householdmembership` `hm` left join `barangayinhabitants` `bi` on(`hm`.`ResidentID` = `bi`.`ResidentID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) left join `occupation` `o` on(`bi`.`OccupationID` = `o`.`OccupationID`)) left join `relations` `r` on(`hm`.`RelationID` = `r`.`RelationID`)) ORDER BY `hm`.`HouseholdNumber` ASC, `bi`.`LastName` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `householdmembers1`
--
DROP TABLE IF EXISTS `householdmembers1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `householdmembers1`  AS SELECT `hm`.`HouseholdNumber` AS `HouseholdNumber`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `FullName`, `bi`.`Sex` AS `Sex`, `bi`.`DateOfBirth` AS `DateOfBirth`, `cs`.`Name` AS `CivilStatus`, `c`.`Name` AS `Citizenship`, `bi`.`OccupationID` AS `OccupationID`, `r`.`Name` AS `RelationToHead` FROM ((((`householdmembership` `hm` left join `barangayinhabitants` `bi` on(`hm`.`ResidentID` = `bi`.`ResidentID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) left join `relations` `r` on(`hm`.`RelationID` = `r`.`RelationID`)) ORDER BY `hm`.`HouseholdNumber` ASC, `bi`.`LastName` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `householdmembers2`
--
DROP TABLE IF EXISTS `householdmembers2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `householdmembers2`  AS SELECT `hm`.`HouseholdMembershipID` AS `HouseholdMembershipID`, `hm`.`HouseholdNumber` AS `HouseholdNumber`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `FullName`, `bi`.`Sex` AS `Sex`, `bi`.`DateOfBirth` AS `DateOfBirth`, `cs`.`Name` AS `CivilStatus`, `c`.`Name` AS `Citizenship`, `bi`.`OccupationID` AS `OccupationID`, `r`.`Name` AS `RelationToHead` FROM ((((`householdmembership` `hm` left join `barangayinhabitants` `bi` on(`hm`.`ResidentID` = `bi`.`ResidentID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) left join `relations` `r` on(`hm`.`RelationID` = `r`.`RelationID`)) ORDER BY `hm`.`HouseholdNumber` ASC, `bi`.`LastName` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `householdsfull`
--
DROP TABLE IF EXISTS `householdsfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `householdsfull`  AS SELECT `h`.`HouseholdNumber` AS `HouseholdNumber`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `h`.`TotalInhabitants` AS `TotalInhabitants`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `HouseholdHead` FROM ((`household` `h` left join `address` `a` on(`h`.`AddressID` = `a`.`AddressID`)) left join `barangayinhabitants` `bi` on(`h`.`HouseholdHead` = `bi`.`ResidentID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `householdtracker`
--
DROP TABLE IF EXISTS `householdtracker`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `householdtracker`  AS SELECT `h`.`HouseholdNumber` AS `HouseholdNumber`, concat('Household Number: ',`h`.`HouseholdNumber`) AS `Name` FROM `household` AS `h` ;

-- --------------------------------------------------------

--
-- Structure for view `kkmembersfull`
--
DROP TABLE IF EXISTS `kkmembersfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `kkmembersfull`  AS SELECT `kkm`.`KKMemberID` AS `KKMemberID`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `FullName`, `yc`.`Name` AS `YouthClassification`, `yag`.`Name` AS `YouthAgeGroup`, `kkm`.`ContactNumber` AS `ContactNumber`, `kkm`.`EmailAddress` AS `EmailAddress`, `hea`.`HighestEducationalAttainmentName` AS `HighestEducationalAttainment`, `ws`.`Name` AS `WorkStatus`, date_format(`bi`.`DateOfBirth`,'%Y-%m-%d') AS `DateOfBirth` FROM (((((`kkmembers` `kkm` left join `barangayinhabitants` `bi` on(`kkm`.`ResidentID` = `bi`.`ResidentID`)) left join `youthclassification` `yc` on(`kkm`.`YouthClassification` = `yc`.`YouthClassificationID`)) left join `youthagegroup` `yag` on(`kkm`.`YouthAgeGroup` = `yag`.`YouthAgeGroupID`)) left join `highesteducationalattainment` `hea` on(`kkm`.`HighestEducationalAttainmentID` = `hea`.`HighestEducationalAttainmentID`)) left join `workstatus` `ws` on(`kkm`.`WorkStatus` = `ws`.`WorkStatusID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `residenttracker`
--
DROP TABLE IF EXISTS `residenttracker`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `residenttracker`  AS SELECT `bi`.`ResidentID` AS `ResidentID`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `Name` FROM `barangayinhabitants` AS `bi` ;

-- --------------------------------------------------------

--
-- Structure for view `seniorcitizensfull`
--
DROP TABLE IF EXISTS `seniorcitizensfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `seniorcitizensfull`  AS SELECT `sc`.`SeniorCitizenID` AS `SeniorCitizenID`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `FullName`, `sc`.`SeniorCitizenNumber` AS `SeniorCitizenNumber`, `sc`.`ContactNumber` AS `ContactNumber`, `sc`.`Email` AS `Email`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `cs`.`Name` AS `CivilStatus`, `c`.`Name` AS `Citizenship`, `o`.`Name` AS `Occupation` FROM (((((`seniorcitizens` `sc` left join `barangayinhabitants` `bi` on(`sc`.`ResidentID` = `bi`.`ResidentID`)) left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) left join `occupation` `o` on(`bi`.`OccupationID` = `o`.`OccupationID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `seniorcitizensfull1`
--
DROP TABLE IF EXISTS `seniorcitizensfull1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `seniorcitizensfull1`  AS SELECT `sc`.`SeniorCitizenID` AS `SeniorCitizenID`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `FullName`, `sc`.`SeniorCitizenNumber` AS `SeniorCitizenNumber`, `sc`.`ContactNumber` AS `ContactNumber`, `sc`.`Email` AS `Email`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `cs`.`Name` AS `CivilStatus`, `c`.`Name` AS `Citizenship`, `o`.`Name` AS `Occupation` FROM (((((`seniorcitizens` `sc` left join `barangayinhabitants` `bi` on(`sc`.`ResidentID` = `bi`.`ResidentID`)) left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) left join `occupation` `o` on(`bi`.`OccupationID` <> 0)) ;

-- --------------------------------------------------------

--
-- Structure for view `seniorcitizensfull2`
--
DROP TABLE IF EXISTS `seniorcitizensfull2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `seniorcitizensfull2`  AS SELECT `sc`.`SeniorCitizenID` AS `SeniorCitizenID`, concat(`bi`.`LastName`,', ',`bi`.`GivenName`,' ',`bi`.`MiddleName`) AS `FullName`, `sc`.`SeniorCitizenNumber` AS `SeniorCitizenNumber`, `sc`.`ContactNumber` AS `ContactNumber`, `sc`.`Email` AS `Email`, concat(`a`.`Zone`,', ',`a`.`Barangay`,', ',`a`.`Town`) AS `Address`, `cs`.`Name` AS `CivilStatus`, `c`.`Name` AS `Citizenship`, `bi`.`OccupationID` AS `OccupationID`, `bi`.`DateOfBirth` AS `DateOfBirth` FROM ((((`seniorcitizens` `sc` left join `barangayinhabitants` `bi` on(`sc`.`ResidentID` = `bi`.`ResidentID`)) left join `address` `a` on(`bi`.`AddressID` = `a`.`AddressID`)) left join `civilstatus` `cs` on(`bi`.`CivilStatusID` = `cs`.`CivilStatusID`)) left join `citizenship` `c` on(`bi`.`CitizenshipID` = `c`.`CitizenshipID`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`AddressID`);

--
-- Indexes for table `barangayinhabitants`
--
ALTER TABLE `barangayinhabitants`
  ADD PRIMARY KEY (`ResidentID`),
  ADD KEY `AddressID` (`AddressID`),
  ADD KEY `CivilStatusID` (`CivilStatusID`),
  ADD KEY `CitizenshipID` (`CitizenshipID`);

--
-- Indexes for table `citizenship`
--
ALTER TABLE `citizenship`
  ADD PRIMARY KEY (`CitizenshipID`);

--
-- Indexes for table `civilstatus`
--
ALTER TABLE `civilstatus`
  ADD PRIMARY KEY (`CivilStatusID`);

--
-- Indexes for table `highesteducationalattainment`
--
ALTER TABLE `highesteducationalattainment`
  ADD PRIMARY KEY (`HighestEducationalAttainmentID`);

--
-- Indexes for table `household`
--
ALTER TABLE `household`
  ADD PRIMARY KEY (`HouseholdNumber`),
  ADD KEY `AddressID` (`AddressID`),
  ADD KEY `HouseholdHead` (`HouseholdHead`);

--
-- Indexes for table `householdmembership`
--
ALTER TABLE `householdmembership`
  ADD PRIMARY KEY (`HouseholdMembershipID`),
  ADD KEY `ResidentID` (`ResidentID`),
  ADD KEY `HouseholdNumber` (`HouseholdNumber`),
  ADD KEY `RelationID` (`RelationID`);

--
-- Indexes for table `kkattendance`
--
ALTER TABLE `kkattendance`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `KKMemberID` (`KKMemberID`);

--
-- Indexes for table `kkmembers`
--
ALTER TABLE `kkmembers`
  ADD PRIMARY KEY (`KKMemberID`),
  ADD KEY `ResidentID` (`ResidentID`),
  ADD KEY `YouthClassification` (`YouthClassification`),
  ADD KEY `YouthAgeGroup` (`YouthAgeGroup`),
  ADD KEY `WorkStatus` (`WorkStatus`),
  ADD KEY `FK_HighestEducationalAttainment` (`HighestEducationalAttainmentID`);

--
-- Indexes for table `luponrecords`
--
ALTER TABLE `luponrecords`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `CaseNo` (`CaseNo`);

--
-- Indexes for table `occupation`
--
ALTER TABLE `occupation`
  ADD PRIMARY KEY (`OccupationID`);

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`RelationID`);

--
-- Indexes for table `seniorcitizens`
--
ALTER TABLE `seniorcitizens`
  ADD PRIMARY KEY (`SeniorCitizenID`),
  ADD KEY `ResidentID` (`ResidentID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `voterregistration`
--
ALTER TABLE `voterregistration`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `KKMemberID` (`KKMemberID`);

--
-- Indexes for table `workstatus`
--
ALTER TABLE `workstatus`
  ADD PRIMARY KEY (`WorkStatusID`);

--
-- Indexes for table `youthagegroup`
--
ALTER TABLE `youthagegroup`
  ADD PRIMARY KEY (`YouthAgeGroupID`);

--
-- Indexes for table `youthclassification`
--
ALTER TABLE `youthclassification`
  ADD PRIMARY KEY (`YouthClassificationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `AddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `barangayinhabitants`
--
ALTER TABLE `barangayinhabitants`
  MODIFY `ResidentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;

--
-- AUTO_INCREMENT for table `citizenship`
--
ALTER TABLE `citizenship`
  MODIFY `CitizenshipID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `civilstatus`
--
ALTER TABLE `civilstatus`
  MODIFY `CivilStatusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `highesteducationalattainment`
--
ALTER TABLE `highesteducationalattainment`
  MODIFY `HighestEducationalAttainmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `householdmembership`
--
ALTER TABLE `householdmembership`
  MODIFY `HouseholdMembershipID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `kkattendance`
--
ALTER TABLE `kkattendance`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kkmembers`
--
ALTER TABLE `kkmembers`
  MODIFY `KKMemberID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `luponrecords`
--
ALTER TABLE `luponrecords`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `occupation`
--
ALTER TABLE `occupation`
  MODIFY `OccupationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `RelationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `seniorcitizens`
--
ALTER TABLE `seniorcitizens`
  MODIFY `SeniorCitizenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `voterregistration`
--
ALTER TABLE `voterregistration`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workstatus`
--
ALTER TABLE `workstatus`
  MODIFY `WorkStatusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `youthagegroup`
--
ALTER TABLE `youthagegroup`
  MODIFY `YouthAgeGroupID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `youthclassification`
--
ALTER TABLE `youthclassification`
  MODIFY `YouthClassificationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barangayinhabitants`
--
ALTER TABLE `barangayinhabitants`
  ADD CONSTRAINT `barangayinhabitants_ibfk_1` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `barangayinhabitants_ibfk_2` FOREIGN KEY (`CivilStatusID`) REFERENCES `civilstatus` (`CivilStatusID`),
  ADD CONSTRAINT `barangayinhabitants_ibfk_4` FOREIGN KEY (`CitizenshipID`) REFERENCES `citizenship` (`CitizenshipID`);

--
-- Constraints for table `household`
--
ALTER TABLE `household`
  ADD CONSTRAINT `household_ibfk_1` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`),
  ADD CONSTRAINT `household_ibfk_2` FOREIGN KEY (`HouseholdHead`) REFERENCES `barangayinhabitants` (`ResidentID`);

--
-- Constraints for table `householdmembership`
--
ALTER TABLE `householdmembership`
  ADD CONSTRAINT `householdmembership_ibfk_1` FOREIGN KEY (`ResidentID`) REFERENCES `barangayinhabitants` (`ResidentID`),
  ADD CONSTRAINT `householdmembership_ibfk_2` FOREIGN KEY (`HouseholdNumber`) REFERENCES `household` (`HouseholdNumber`),
  ADD CONSTRAINT `householdmembership_ibfk_3` FOREIGN KEY (`RelationID`) REFERENCES `relations` (`RelationID`);

--
-- Constraints for table `kkattendance`
--
ALTER TABLE `kkattendance`
  ADD CONSTRAINT `kkattendance_ibfk_1` FOREIGN KEY (`KKMemberID`) REFERENCES `kkmembers` (`KKMemberID`);

--
-- Constraints for table `kkmembers`
--
ALTER TABLE `kkmembers`
  ADD CONSTRAINT `FK_HighestEducationalAttainment` FOREIGN KEY (`HighestEducationalAttainmentID`) REFERENCES `highesteducationalattainment` (`HighestEducationalAttainmentID`),
  ADD CONSTRAINT `kkmembers_ibfk_1` FOREIGN KEY (`ResidentID`) REFERENCES `barangayinhabitants` (`ResidentID`),
  ADD CONSTRAINT `kkmembers_ibfk_2` FOREIGN KEY (`YouthClassification`) REFERENCES `youthclassification` (`YouthClassificationID`),
  ADD CONSTRAINT `kkmembers_ibfk_3` FOREIGN KEY (`YouthAgeGroup`) REFERENCES `youthagegroup` (`YouthAgeGroupID`),
  ADD CONSTRAINT `kkmembers_ibfk_4` FOREIGN KEY (`WorkStatus`) REFERENCES `workstatus` (`WorkStatusID`);

--
-- Constraints for table `seniorcitizens`
--
ALTER TABLE `seniorcitizens`
  ADD CONSTRAINT `seniorcitizens_ibfk_1` FOREIGN KEY (`ResidentID`) REFERENCES `barangayinhabitants` (`ResidentID`);

--
-- Constraints for table `voterregistration`
--
ALTER TABLE `voterregistration`
  ADD CONSTRAINT `voterregistration_ibfk_1` FOREIGN KEY (`KKMemberID`) REFERENCES `kkmembers` (`KKMemberID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
