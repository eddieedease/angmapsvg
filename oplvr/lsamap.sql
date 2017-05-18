-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 18, 2017 at 04:11 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.0.13

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
-- Table structure for table `about`
--

CREATE TABLE IF NOT EXISTS `about` (
  `id` int(11) NOT NULL,
  `text1` text NOT NULL,
  `text2` text NOT NULL,
  `text3` text NOT NULL,
  `text4` text NOT NULL,
  `text5` text NOT NULL,
  `text6` text NOT NULL,
  `text7` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `text1`, `text2`, `text3`, `text4`, `text5`, `text6`, `text7`) VALUES
(1, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum aliquet ipsum eget eleifend. Phasellus erat tortor, pellentesque nec felis at, dignissim euismod quam. Morbi non sapien tincidunt, feugiat mauris in, placerat ex. Pellentesque sodales eros nunc, eu posuere augue dapibus ut. Vestibulum dui lacus, pulvinar in nulla et, facilisis fringilla ante. Phasellus vitae dolor a eros consectetur luctus in a nulla. Morbi ornare metus ante. Aliquam interdum ipsum sit amet pellentesque consectetur.</p>\n<p>Integer at erat eget ligula consequat feugiat. Vivamus nec iaculis mauris, eget lacinia sem. Etiam id nulla venenatis, tincidunt nisl in, convallis urna. Mauris ac neque fringilla, ullamcorper ex vel, convallis urna. Proin finibus vitae purus quis pretium. Proin semper ante eu pellentesque blandit. Nunc hendrerit velit nec pellentesque iaculis. Morbi porta dapibus luctus. Aenean felis ipsum, bibendum vitae lacus quis, condimentum congue urna. Donec arcu dolor, tincidunt eu ante vel, vehicula laoreet erat. Nunc pharetra odio purus, a egestas dolor semper in. Nullam nec sapien nec ex vehicula molestie a eget tellus. Ut finibus elit lacus, eu rhoncus tellus fringilla nec. Pellentesque laoreet porttitor augue in congue. Cras quis magna at metus sagittis eleifend tincidunt ac felis.</p>\n<p>Aenean sollicitudin massa nunc. Nunc tempor in purus a fringilla. Aenean non elit velit. Vestibulum felis neque, venenatis eget risus sit amet, luctus dignissim metus. Vestibulum facilisis, mi a vestibulum tristique, magna nisl tincidunt nulla, id posuere nisl elit tempus nunc. Sed in bibendum nunc. Donec non molestie augue. Curabitur quis aliquet lectus.</p>\n<p>Etiam sed sollicitudin lorem. Curabitur et ligula egestas, rutrum elit sit amet, feugiat leo. In eget consequat libero, sit amet rutrum arcu. Proin varius velit fermentum ipsum eleifend laoreet. Fusce ultricies quam ultrices, interdum nulla id, tristique odio. Aliquam non mauris dignissim, fermentum purus a, pretium turpis. Cras sed malesuada ipsum. Duis pellentesque, nisl a rhoncus fringilla, tortor diam blandit nunc, id sollicitudin sapien mauris pellentesque orci. Quisque volutpat tristique enim, nec rhoncus risus maximus a. Etiam nec turpis convallis, condimentum quam elementum, gravida erat.</p>\n<p>Proin et vulputate turpis. Donec sodales ante in enim ultrices rhoncus. Morbi vitae purus blandit, iaculis purus ut, facilisis nibh. Nullam ut ex neque. Vivamus ac mi in felis iaculis lacinia. Fusce tempor placerat lorem, non finibus ligula lacinia eget. Curabitur quam mauris, venenatis vel purus vestibulum, semper semper leo. Praesent laoreet, eros sit amet blandit finibus, sem est tristique metus, eu sollicitudin nisl arcu nec neque. Suspendisse ut nisl eu tellus commodo mollis in dictum arcu. Cras vitae tellus ut felis sodales interdum a a dui.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula tortor, porta ac mi non, scelerisque ultricies elit. Mauris volutpat tristique mauris, non consectetur arcu. Aliquam sit amet commodo massa, non fringilla sapien. Quisque quis neque sed lorem imperdiet facilisis non ut leo. Morbi euismod finibus cursus. Donec sollicitudin nibh vitae facilisis condimentum. Aliquam pulvinar condimentum nibh, quis pellentesque odio maximus in. Etiam nec nisi faucibus, dictum urna non, fringilla purus. Quisque eu interdum magna. Fusce sagittis nibh ipsum, vitae faucibus turpis vulputate at. Quisque vestibulum lectus sem, at aliquam neque sollicitudin vitae. Quisque ac nibh quis tortor porttitor scelerisque ac ut ipsum. Suspendisse rutrum dictum auctor. Integer in maximus arcu.</p>\n<p>Sed faucibus enim vel ultricies volutpat. Aliquam quis euismod leo. Fusce a pellentesque lorem. In blandit tellus neque, ut convallis leo maximus at. Cras pulvinar velit et sapien fringilla, placerat vestibulum tortor congue. Vestibulum congue consectetur tellus vestibulum suscipit. Nunc bibendum velit id metus auctor semper. Integer ac porta nibh. Curabitur hendrerit justo sed imperdiet vehicula. Maecenas lacinia consequat dictum.</p>\n<p>Suspendisse dolor risus, dignissim a leo id, imperdiet tempor sem. Donec eleifend ex diam, nec malesuada nibh blandit eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc lacus orci, tempor eu justo nec, finibus porttitor felis. Aenean fringilla odio non purus fringilla aliquam. Vivamus lorem tortor, porta sed lacus a, fermentum scelerisque lorem. In sed nulla felis. Praesent sit amet mauris non lectus hendrerit vehicula sed ut lorem.</p>\n<p>Cras molestie ullamcorper est at egestas. Phasellus neque mauris, aliquet non neque id, efficitur viverra est. Cras maximus sapien quis nisl malesuada scelerisque. In hac habitasse platea dictumst. Proin vel arcu ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse bibendum metus sit amet nisl pretium molestie. Donec nunc leo, finibus non luctus maximus, pharetra et sapien. Etiam scelerisque elit est, et scelerisque lacus efficitur fringilla. Vivamus pellentesque libero in blandit luctus. Etiam mollis venenatis enim. Nulla ante mauris, pellentesque in quam vel, interdum accumsan mauris.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula tortor, porta ac mi non, scelerisque ultricies elit. Mauris volutpat tristique mauris, non consectetur arcu. Aliquam sit amet commodo massa, non fringilla sapien. Quisque quis neque sed lorem imperdiet facilisis non ut leo. Morbi euismod finibus cursus. Donec sollicitudin nibh vitae facilisis condimentum. Aliquam pulvinar condimentum nibh, quis pellentesque odio maximus in. Etiam nec nisi faucibus, dictum urna non, fringilla purus. Quisque eu interdum magna. Fusce sagittis nibh ipsum, vitae faucibus turpis vulputate at. Quisque vestibulum lectus sem, at aliquam neque sollicitudin vitae. Quisque ac nibh quis tortor porttitor scelerisque ac ut ipsum. Suspendisse rutrum dictum auctor. Integer in maximus arcu.</p>\n<p>Sed faucibus enim vel ultricies volutpat. Aliquam quis euismod leo. Fusce a pellentesque lorem. In blandit tellus neque, ut convallis leo maximus at. Cras pulvinar velit et sapien fringilla, placerat vestibulum tortor congue. Vestibulum congue consectetur tellus vestibulum suscipit. Nunc bibendum velit id metus auctor semper. Integer ac porta nibh. Curabitur hendrerit justo sed imperdiet vehicula. Maecenas lacinia consequat dictum.</p>\n<p>Suspendisse dolor risus, dignissim a leo id, imperdiet tempor sem. Donec eleifend ex diam, nec malesuada nibh blandit eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc lacus orci, tempor eu justo nec, finibus porttitor felis. Aenean fringilla odio non purus fringilla aliquam. Vivamus lorem tortor, porta sed lacus a, fermentum scelerisque lorem. In sed nulla felis. Praesent sit amet mauris non lectus hendrerit vehicula sed ut lorem.</p>\n<p>Cras molestie ullamcorper est at egestas. Phasellus neque mauris, aliquet non neque id, efficitur viverra est. Cras maximus sapien quis nisl malesuada scelerisque. In hac habitasse platea dictumst. Proin vel arcu ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse bibendum metus sit amet nisl pretium molestie. Donec nunc leo, finibus non luctus maximus, pharetra et sapien. Etiam scelerisque elit est, et scelerisque lacus efficitur fringilla. Vivamus pellentesque libero in blandit luctus. Etiam mollis venenatis enim. Nulla ante mauris, pellentesque in quam vel, interdum accumsan mauris.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula tortor, porta ac mi non, scelerisque ultricies elit. Mauris volutpat tristique mauris, non consectetur arcu. Aliquam sit amet commodo massa, non fringilla sapien. Quisque quis neque sed lorem imperdiet facilisis non ut leo. Morbi euismod finibus cursus. Donec sollicitudin nibh vitae facilisis condimentum. Aliquam pulvinar condimentum nibh, quis pellentesque odio maximus in. Etiam nec nisi faucibus, dictum urna non, fringilla purus. Quisque eu interdum magna. Fusce sagittis nibh ipsum, vitae faucibus turpis vulputate at. Quisque vestibulum lectus sem, at aliquam neque sollicitudin vitae. Quisque ac nibh quis tortor porttitor scelerisque ac ut ipsum. Suspendisse rutrum dictum auctor. Integer in maximus arcu.</p>\n<p>Sed faucibus enim vel ultricies volutpat. Aliquam quis euismod leo. Fusce a pellentesque lorem. In blandit tellus neque, ut convallis leo maximus at. Cras pulvinar velit et sapien fringilla, placerat vestibulum tortor congue. Vestibulum congue consectetur tellus vestibulum suscipit. Nunc bibendum velit id metus auctor semper. Integer ac porta nibh. Curabitur hendrerit justo sed imperdiet vehicula. Maecenas lacinia consequat dictum.</p>\n<p>Suspendisse dolor risus, dignissim a leo id, imperdiet tempor sem. Donec eleifend ex diam, nec malesuada nibh blandit eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc lacus orci, tempor eu justo nec, finibus porttitor felis. Aenean fringilla odio non purus fringilla aliquam. Vivamus lorem tortor, porta sed lacus a, fermentum scelerisque lorem. In sed nulla felis. Praesent sit amet mauris non lectus hendrerit vehicula sed ut lorem.</p>\n<p>Cras molestie ullamcorper est at egestas. Phasellus neque mauris, aliquet non neque id, efficitur viverra est. Cras maximus sapien quis nisl malesuada scelerisque. In hac habitasse platea dictumst. Proin vel arcu ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse bibendum metus sit amet nisl pretium molestie. Donec nunc leo, finibus non luctus maximus, pharetra et sapien. Etiam scelerisque elit est, et scelerisque lacus efficitur fringilla. Vivamus pellentesque libero in blandit luctus. Etiam mollis venenatis enim. Nulla ante mauris, pellentesque in quam vel, interdum accumsan mauris.</p>', '<p>Nulla facilisi. Integer quam metus, finibus non mi sed, vestibulum eleifend lacus. Mauris sed porta arcu. Etiam ultricies aliquam molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla tempor congue commodo. Aenean imperdiet dignissim velit in bibendum.</p>\n<p>Curabitur ac commodo sapien. Donec at lorem id eros volutpat sagittis. Phasellus eget ultricies lorem. Suspendisse feugiat ornare scelerisque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris tincidunt a dui pretium condimentum. Nullam vitae elementum tortor, vitae semper nisi. Suspendisse molestie volutpat tortor, eleifend suscipit risus pellentesque ac. Donec lacinia imperdiet risus. Phasellus sed nisl sodales, feugiat lorem vitae, interdum nibh. Suspendisse laoreet posuere mauris, quis mattis nibh vulputate eu. Nullam turpis est, convallis ac semper sed, mattis nec velit. Curabitur ultrices, mi in ullamcorper porta, mauris arcu venenatis arcu, sed luctus odio est quis dolor. Nullam aliquam maximus diam, quis faucibus ante tempor ut. Cras vitae imperdiet tellus. Sed luctus gravida lacinia.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula tortor, porta ac mi non, scelerisque ultricies elit. Mauris volutpat tristique mauris, non consectetur arcu. Aliquam sit amet commodo massa, non fringilla sapien. Quisque quis neque sed lorem imperdiet facilisis non ut leo. Morbi euismod finibus cursus. Donec sollicitudin nibh vitae facilisis condimentum. Aliquam pulvinar condimentum nibh, quis pellentesque odio maximus in. Etiam nec nisi faucibus, dictum urna non, fringilla purus. Quisque eu interdum magna. Fusce sagittis nibh ipsum, vitae faucibus turpis vulputate at. Quisque vestibulum lectus sem, at aliquam neque sollicitudin vitae. Quisque ac nibh quis tortor porttitor scelerisque ac ut ipsum. Suspendisse rutrum dictum auctor. Integer in maximus arcu.</p>\n<p>Sed faucibus enim vel ultricies volutpat. Aliquam quis euismod leo. Fusce a pellentesque lorem. In blandit tellus neque, ut convallis leo maximus at. Cras pulvinar velit et sapien fringilla, placerat vestibulum tortor congue. Vestibulum congue consectetur tellus vestibulum suscipit. Nunc bibendum velit id metus auctor semper. Integer ac porta nibh. Curabitur hendrerit justo sed imperdiet vehicula. Maecenas lacinia consequat dictum.</p>\n<p>Suspendisse dolor risus, dignissim a leo id, imperdiet tempor sem. Donec eleifend ex diam, nec malesuada nibh blandit eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc lacus orci, tempor eu justo nec, finibus porttitor felis. Aenean fringilla odio non purus fringilla aliquam. Vivamus lorem tortor, porta sed lacus a, fermentum scelerisque lorem. In sed nulla felis. Praesent sit amet mauris non lectus hendrerit vehicula sed ut lorem.</p>\n<p>Cras molestie ullamcorper est at egestas. Phasellus neque mauris, aliquet non neque id, efficitur viverra est. Cras maximus sapien quis nisl malesuada scelerisque. In hac habitasse platea dictumst. Proin vel arcu ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse bibendum metus sit amet nisl pretium molestie. Donec nunc leo, finibus non luctus maximus, pharetra et sapien. Etiam scelerisque elit est, et scelerisque lacus efficitur fringilla. Vivamus pellentesque libero in blandit luctus. Etiam mollis venenatis enim. Nulla ante mauris, pellentesque in quam vel, interdum accumsan mauris.</p>', 'textasd7');

-- --------------------------------------------------------

--
-- Table structure for table `api`
--

CREATE TABLE IF NOT EXISTS `api` (
  `id` int(11) NOT NULL,
  `ww` text NOT NULL,
  `usr` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `api`
--

INSERT INTO `api` (`id`, `ww`, `usr`, `email`) VALUES
(1, '1721159c58afa5f80b61dfbfa3dced75', 'Admin', 'lsa@lsabewoners.nl');

-- --------------------------------------------------------

--
-- Table structure for table `gemeenten`
--

CREATE TABLE IF NOT EXISTS `gemeenten` (
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `buurtrecht` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL,
  `b1` text NOT NULL,
  `b2` text NOT NULL,
  `b3` text NOT NULL,
  `b4` text NOT NULL,
  `b5` text NOT NULL,
  `b6` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `instrument`
--

CREATE TABLE IF NOT EXISTS `instrument` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `gemeentenlink` text NOT NULL,
  `link` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE IF NOT EXISTS `uploads` (
  `id` int(11) NOT NULL,
  `cat` text NOT NULL,
  `location` text NOT NULL,
  `description` text NOT NULL,
  `extrainfo` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `api`
--
ALTER TABLE `api`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `gemeenten`
--
ALTER TABLE `gemeenten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `instrument`
--
ALTER TABLE `instrument`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
