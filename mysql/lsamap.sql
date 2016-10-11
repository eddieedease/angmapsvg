-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Gegenereerd op: 10 okt 2016 om 20:56
-- Serverversie: 5.6.32-1+deb.sury.org~xenial+0.1
-- PHP-versie: 7.0.11-2+deb.sury.org~xenial+1

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
-- Tabelstructuur voor tabel `api`
--

CREATE TABLE `api` (
  `id` int(11) NOT NULL,
  `ww` text NOT NULL,
  `usr` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `api`
--

INSERT INTO `api` (`id`, `ww`, `usr`, `email`) VALUES
(1, '1721159c58afa5f80b61dfbfa3dced75', 'Admin', 'test@test.nl');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `gemeenten`
--

CREATE TABLE `gemeenten` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `buurtrecht` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `instrument`
--

CREATE TABLE `instrument` (
  `id` int(11) NOT NULL,
  `naam` text NOT NULL,
  `wysig` text NOT NULL,
  `gemeentenlink` text NOT NULL,
  `link` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `instrument`
--

INSERT INTO `instrument` (`id`, `naam`, `wysig`, `gemeentenlink`, `link`, `date`) VALUES
(1, 'instrument 1', 'yes een html text', 'almere, eindhoven', 'www.edease.nl', '2016-10-07');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `uploads`
--

CREATE TABLE `uploads` (
  `id` int(11) NOT NULL,
  `cat` text NOT NULL,
  `location` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `api`
--
ALTER TABLE `api`
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indexen voor tabel `gemeenten`
--
ALTER TABLE `gemeenten`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexen voor tabel `instrument`
--
ALTER TABLE `instrument`
  ADD KEY `id` (`id`);

--
-- Indexen voor tabel `uploads`
--
ALTER TABLE `uploads`
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `api`
--
ALTER TABLE `api`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT voor een tabel `gemeenten`
--
ALTER TABLE `gemeenten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT voor een tabel `instrument`
--
ALTER TABLE `instrument`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT voor een tabel `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
