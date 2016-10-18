-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Gegenereerd op: 18 okt 2016 om 21:24
-- Serverversie: 5.6.32-1+deb.sury.org~xenial+0.1
-- PHP-versie: 7.0.11-2+deb.sury.org~xenial+2

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

--
-- Gegevens worden geëxporteerd voor tabel `gemeenten`
--

INSERT INTO `gemeenten` (`id`, `name`, `wysig`, `buurtrecht`, `date`) VALUES
(26, 'Lelystad', '<p>Lelystad waar de youtube bloeit</p>\n<p><iframe src="//www.youtube.com/embed/KmcwNOwqMfE" width="560" height="315"></iframe></p>', '2,5,6', '2016-10-17 15:05:23'),
(27, 'Berkelland', '<p>Hier deze kun je vullen</p>\n<ol>\n<li><strong>En dit doen&nbsp;</strong></li>\n<li><strong>en nog iets</strong></li>\n</ol>\n<h3><span style="color: #ff0000;"><strong>wat dan</strong></span></h3>\n<p><span style="background-color: #ff0000;">en dit doen</span></p>\n<p style="padding-left: 30px;"><span style="color: #339966;"><strong>en dit doen</strong></span></p>\n<p style="padding-left: 30px;">&nbsp;</p>\n<p style="padding-left: 30px;"><span style="color: #339966;"><strong>Waut</strong></span></p>\n<p>&nbsp;</p>', '2,3', '2016-10-17 15:13:55'),
(28, 'Peel en Maas', '<p>Klik op deze</p>', '4,5,6', '2016-10-17 15:19:48'),
(29, 'Oss', '<p>adeeze</p>', '2,3', '2016-10-17 15:28:05'),
(30, 'Aalten', '<p>Invullen</p>', '2,4,6', '2016-10-17 15:41:26');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `instrument`
--

CREATE TABLE `instrument` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `gemeentenlink` text NOT NULL,
  `link` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `uploads`
--

CREATE TABLE `uploads` (
  `id` int(11) NOT NULL,
  `cat` text NOT NULL,
  `location` text NOT NULL,
  `description` text NOT NULL,
  `extrainfo` text NOT NULL
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
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indexen voor tabel `uploads`
--
ALTER TABLE `uploads`
  ADD UNIQUE KEY `id_2` (`id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT voor een tabel `instrument`
--
ALTER TABLE `instrument`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT voor een tabel `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
