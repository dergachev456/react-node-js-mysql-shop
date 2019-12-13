-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 13 2019 г., 20:21
-- Версия сервера: 10.3.13-MariaDB-log
-- Версия PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shop`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `myproc` ()  BEGIN
    DECLARE i int DEFAULT 0;
    WHILE i < 5 DO
        INSERT INTO promocode (value, discount) VALUES (45, 6);
        SET i = i + 1;
    END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `street` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `address`
--

INSERT INTO `address` (`id`, `street`, `number`, `district`, `city`, `country`) VALUES
(3751280, 'Akademika Yanhelia', '20', 'Solomenskii', 'Kyiv', 'Ukraine');

-- --------------------------------------------------------

--
-- Структура таблицы `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `total_price` int(6) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `booking`
--

INSERT INTO `booking` (`id`, `date`, `total_price`, `user_id`, `address_id`) VALUES
(8083639, NULL, 19800, 1, 3751280);

-- --------------------------------------------------------

--
-- Структура таблицы `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `manufacturer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `brand`
--

INSERT INTO `brand` (`id`, `name`, `manufacturer_id`) VALUES
(1, 'Philips', NULL),
(2, 'Samsung', NULL),
(3, 'Tp-link', NULL),
(4, 'Xiaomi', NULL),
(5, 'Viking', NULL),
(6, 'Nikon', NULL),
(7, 'Lenovo', NULL),
(8, 'Huawei', NULL),
(9, 'Honor', NULL),
(10, 'Lg', NULL),
(11, 'Top', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transport_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `delivery`
--

INSERT INTO `delivery` (`id`, `type`, `company`, `transport_id`) VALUES
(1, 'classic', 'Rozetka', 3),
(2, 'express', 'Allo', 1),
(3, 'express', 'Comfy', 5),
(4, 'post delivery', 'Allo', 6),
(5, 'classic', 'Zona51', 8),
(6, 'post delivery', 'Comfy', 6),
(7, 'pickup', 'Rozetka', 6),
(8, 'classic', 'Allo', 2),
(9, 'post delivery', 'Zona51', 6),
(10, 'post delivery', 'Eldorado', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `manufacturer`
--

CREATE TABLE `manufacturer` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `manufacturer`
--

INSERT INTO `manufacturer` (`id`, `name`) VALUES
(1, 'Zona52'),
(2, 'IdeaCloud'),
(3, 'React'),
(4, 'Zona52'),
(5, 'Xiaomi'),
(6, 'Samsung'),
(7, 'Denon'),
(8, 'Apple'),
(9, 'Denon'),
(10, 'Amiko');

-- --------------------------------------------------------

--
-- Структура таблицы `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `model`
--

INSERT INTO `model` (`id`, `name`) VALUES
(1, 'Mi'),
(2, 'Performance'),
(3, 'Galaxy'),
(4, 'Archer'),
(5, 'iMOW'),
(6, 'D750'),
(7, 'Legion'),
(8, 'FreeBuds'),
(9, '8X'),
(10, 'NanoCell'),
(11, 'Za 40');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `count` int(5) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `count`, `product_id`, `booking_id`) VALUES
(6273681, 1, 1, 8083639),
(6273682, 1, 2, 8083639),
(6273683, 1, 3, 8083639);

-- --------------------------------------------------------

--
-- Структура таблицы `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `path` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `category`, `availability`, `brand_id`, `model_id`, `path`) VALUES
(1, 'Mi9', 10500, 'phone', 1, 4, 1, '6.jpg'),
(2, 'S10+', 10600, 'phone', 1, 2, 3, 's10.jpg'),
(3, 'Archer A6', 900, 'router', 1, 3, 4, 'archer_a6.jpg'),
(4, 'Legion Y720', 60000, 'laptop', 0, 7, 7, 'lenovo_81.jpg'),
(5, 'FreeBuds 3', 800, 'headphones', 1, 8, 8, 'headph.jpg'),
(6, 'NanoCell', 10000, 'TV', 1, 10, 10, 'lg_49.jpg'),
(7, '8X', 7000, 'phone', 1, 9, 9, '6.jpg'),
(8, 'iMOW', 14000, 'lawn mower', 1, 5, 5, '4661.jpg'),
(9, 'Performance', 12000, 'TV', 0, 1, 2, 'samsung_ue.jpg'),
(10, 'D750', 9000, 'camera', 1, 6, 6, 'nikon.jpg'),
(11, 'Shtany', 40, 'Clothes', 0, 11, 11, 'shtn.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `promocode`
--

CREATE TABLE `promocode` (
  `id` int(11) NOT NULL,
  `value` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `promocode`
--

INSERT INTO `promocode` (`id`, `value`, `discount`) VALUES
(1, 'QWER', 5),
(2, 'ASDF', 10),
(3, 'ZXCV', 20),
(4, 'OIKH', 15),
(5, 'SNNF', 5),
(6, 'AAAA', 25),
(7, 'GHBK', 3),
(8, 'KKKD', 20),
(9, 'EMNB', 15),
(10, 'EMNX', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `transport`
--

CREATE TABLE `transport` (
  `id` int(11) NOT NULL,
  `type` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `transport`
--

INSERT INTO `transport` (`id`, `type`, `number`) VALUES
(1, 'classic', '789532'),
(2, 'classic', '432762'),
(3, 'truck', '213487'),
(4, 'truck', '968032'),
(5, 'classic', '809432'),
(6, 'truck', '865512'),
(7, 'truck', '879433'),
(8, 'classic', '798512'),
(9, 'classic', '743212'),
(10, 'classic', '629783');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `phone_number`, `password`, `isAdmin`) VALUES
(1, 'Alexander', 'Dergachev', 'alex@gmail.com', '+380501865540', '123', 1),
(5, 'Sanya', 'Sosed', 'sanya@gmail.com', '+381501865540', '123', 0),
(6, 'Fedor', 'Psih', 'fedor@gmail.com', '+381101865540', '123', 0),
(7, 'Adam', 'Sun', 'adam@gmail.com', '+380501111540', '123', 0),
(8, 'Tyler', 'Creator', 'tyler@gmail.com', '+380901865540', '123', 0),
(9, 'Petr', 'First', 'petr@gmail.com', '+380501865590', '123', 0),
(10, 'Boris', 'Dors', 'boris@gmail.com', '+380501995540', '123', 0),
(11, 'Tom', 'Cruise', 'tom@gmail.com', '+123456789', '123', 0),
(12, 'Dumbo', 'Freeman', 'dumbo@gmail.com', '+380501865540', '123', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_country` (`city`,`country`);

--
-- Индексы таблицы `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_user_fk` (`user_id`),
  ADD KEY `booking_date` (`date`),
  ADD KEY `booking_address_fk` (`address_id`);

--
-- Индексы таблицы `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_manufacturer_fk` (`manufacturer_id`);

--
-- Индексы таблицы `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `delivery_transport_fk` (`transport_id`);

--
-- Индексы таблицы `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_product_fk` (`product_id`),
  ADD KEY `order_booking_fk` (`booking_id`);

--
-- Индексы таблицы `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_brand_fk` (`brand_id`),
  ADD KEY `product_model_fk` (`model_id`),
  ADD KEY `id_price` (`id`,`price`);

--
-- Индексы таблицы `promocode`
--
ALTER TABLE `promocode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discount` (`discount`),
  ADD KEY `value` (`value`);

--
-- Индексы таблицы `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95647293;

--
-- AUTO_INCREMENT для таблицы `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `promocode`
--
ALTER TABLE `promocode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT для таблицы `transport`
--
ALTER TABLE `transport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_address_fk` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  ADD CONSTRAINT `booking_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `brand_manufacturer_fk` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `delivery_transport_fk` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `order_booking_fk` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_brand_fk` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_model_fk` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
