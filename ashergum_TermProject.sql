-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 11, 2021 at 02:18 AM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ashergum_TermProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bakery`
--

CREATE TABLE `Bakery` (
  `bakeryID` int(11) NOT NULL,
  `bakeryName` varchar(30) DEFAULT NULL,
  `bakeryLocation` varchar(50) DEFAULT NULL,
  `bakeryManager` varchar(30) DEFAULT NULL,
  `bakeryDescription` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Bakery`
--

INSERT INTO `Bakery` (`bakeryID`, `bakeryName`, `bakeryLocation`, `bakeryManager`, `bakeryDescription`) VALUES
(43, 'South Bound', '1434 Fedikle street', 'Max Rosewell', 'A small bakery filled with rats'),
(44, 'New Bakery', '234 Kelms Street', 'John Winkel', 'Small peas in the fridge'),
(47, 'Breadinare', '234 Ilkoe streat', 'tititei', 'Ininterny'),
(48, 'Brick manufacturing unit #472', 'Northern Industrial Plant, Sector 7', 'Bricky McBrickface', 'Yet another brick baking facility.');

-- --------------------------------------------------------

--
-- Table structure for table `Dessert`
--

CREATE TABLE `Dessert` (
  `dessertID` int(11) NOT NULL,
  `dessertName` varchar(30) DEFAULT NULL,
  `dessertIngredients` varchar(500) DEFAULT NULL,
  `dessertDescription` varchar(500) DEFAULT NULL,
  `bakeryID` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Dessert`
--

INSERT INTO `Dessert` (`dessertID`, `dessertName`, `dessertIngredients`, `dessertDescription`, `bakeryID`) VALUES
(15, 'Pie', 'pie', 'teet', 43),
(17, 'Lemon Brick', 'Lemon flavoring, Brick', 'A lemon scented brick', 2),
(18, 'Apple brick', 'Apple sauce, bricks', 'Brick with apple sauce filling', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL,
  `role` varchar(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `bakeryID` int(11) DEFAULT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`employeeID`, `role`, `description`, `bakeryID`, `firstName`, `lastName`) VALUES
(9, 'Jimin', 'etet', 43, 'tet', 'tet'),
(11, 'Manager of Brick Making', 'Has a particular interest in cream soda. And also bricks.', 3, 'Bricky', 'McBrickface');

-- --------------------------------------------------------

--
-- Table structure for table `Stats`
--

CREATE TABLE `Stats` (
  `Endpoint` varchar(255) DEFAULT NULL,
  `GET_stat` int(11) DEFAULT NULL,
  `POST_stat` int(11) DEFAULT NULL,
  `PUT_stat` int(11) DEFAULT NULL,
  `DELETE_stat` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Stats`
--

INSERT INTO `Stats` (`Endpoint`, `GET_stat`, `POST_stat`, `PUT_stat`, `DELETE_stat`) VALUES
('/Comp4537/termproject/API/V1/bakery', 3308, 60, 5, 31),
('/Comp4537/termproject/API/V1/dessert', 658, 19, 19, 29),
('/Comp4537/termproject/API/V1/employee', 460, 18, 106, 9),
('/Comp4537/termproject/API/V1/user', 50, 42, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userName` varchar(255) DEFAULT NULL,
  `uPassword` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isAdmin` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userName`, `uPassword`, `email`, `isAdmin`) VALUES
('ashergum', 'password', 'ashergum@gmail.com', 1),
('iridiaclient', 'iridia', 'iridia@gmail.com', 1),
('iridiaadmin', 'cpass', 'iridia@gmail.com', 1),
('iridia', 'iridia', 'iridia@gmail.com', 1),
('craganitbcit', 'craganit', 'craganit@my.bcit.ca', 1),
('iraamaya', 'craganit', 'craganit@contractor.ea.com', 1),
('craganit', 'craganit', 'craganit@my.bcit.ca', 1),
('lridia', 'cauirhwieufhw', 'craganit@my.bcit.ca', 1),
('client', 'cpass', 'client@email.com', 0),
('123', 'awqweqwewqe', 'christinaraganit@gmail.com', 1),
('ceriseclient', 'cerise', 'cerise@gmail.com', 0),
('ceriseadmin', 'cerise', 'cerise@gmail.com', 0),
('toastclient', 'toast', 'toast@gmail.com', 0),
('breadclient', 'bread', 'bread@gmail.com', 0),
('breadadmin', 'bread', 'bread@gmail.com', 0),
('kwisadmin', 'kwis', 'kwis', 0),
('kwisclient', 'kwis', 'kwis', 0),
('astrisclient', 'astris', 'astris', 0),
('calianaclient', 'caliana', 'caliana', 0),
('calianaadmin', 'caliana', 'caliana', 1),
('TestSign', 'testing', 'testtest.com', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bakery`
--
ALTER TABLE `Bakery`
  ADD PRIMARY KEY (`bakeryID`);

--
-- Indexes for table `Dessert`
--
ALTER TABLE `Dessert`
  ADD PRIMARY KEY (`dessertID`),
  ADD KEY `bakeryID` (`bakeryID`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`employeeID`),
  ADD KEY `bakeryID` (`bakeryID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bakery`
--
ALTER TABLE `Bakery`
  MODIFY `bakeryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `Dessert`
--
ALTER TABLE `Dessert`
  MODIFY `dessertID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
