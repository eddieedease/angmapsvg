-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 27, 2017 at 09:52 PM
-- Server version: 5.7.17-0ubuntu0.16.04.2
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lsamap`
--

-- --------------------------------------------------------

--
-- Table structure for table `api`
--

CREATE TABLE `api` (
  `id` int(11) NOT NULL,
  `ww` text NOT NULL,
  `usr` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `api`
--

INSERT INTO `api` (`id`, `ww`, `usr`, `email`) VALUES
(1, '1721159c58afa5f80b61dfbfa3dced75', 'Admin', 'lsa@lsabewoners.nl');

-- --------------------------------------------------------

--
-- Table structure for table `gemeenten`
--

CREATE TABLE `gemeenten` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `buurtrecht` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gemeenten`
--

INSERT INTO `gemeenten` (`id`, `name`, `wysig`, `buurtrecht`, `date`) VALUES
(45, 'Coevorden', '<p>werewrwrewrwrwrwerasfdsafdsadfsafsafafa</p>', '1,3,5', '2017-04-27 19:47:36'),
(46, 'Roosendaal', '<p>Roosendaal de gekstuuuuuu</p>', '5,6', '2016-10-31 12:57:01'),
(47, 'Venray', '<p>Probeer deze eens even te vullen joh!</p>', '2,3,4', '2017-04-24 13:52:30'),
(48, 'Coevorden', '<p>werewrwrewrwrwrwerasfdsafdsadfsafsafafa</p>', '1,3,5', '2017-04-27 19:47:36');

-- --------------------------------------------------------

--
-- Table structure for table `instrument`
--

CREATE TABLE `instrument` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `gemeentenlink` text NOT NULL,
  `link` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instrument`
--

INSERT INTO `instrument` (`id`, `name`, `wysig`, `gemeentenlink`, `link`, `date`) VALUES
(7, 'test instrument coevordensdafdsafsafsa', '<p>testestadadasadfsadfsafaJAJAJAJAJA</p>', 'Coevorden', '2', '2016-10-30 16:12:41'),
(8, 'nog 1', '<p>Vor roosendaal de gekste</p>', 'Roosendaal', '4', '2016-10-31 12:10:58');

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` int(11) NOT NULL,
  `cat` text NOT NULL,
  `location` text NOT NULL,
  `description` text NOT NULL,
  `extrainfo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api`
--
ALTER TABLE `api`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `gemeenten`
--
ALTER TABLE `gemeenten`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `instrument`
--
ALTER TABLE `instrument`
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api`
--
ALTER TABLE `api`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `gemeenten`
--
ALTER TABLE `gemeenten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `instrument`
--
ALTER TABLE `instrument`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
