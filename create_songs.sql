-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Fev-2025 às 18:45
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `create_songs`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `songs`
--

CREATE TABLE `songs` (
  `id` int(255) NOT NULL COMMENT 'Unique identifier for each song',
  `title` varchar(255) NOT NULL COMMENT 'Title of the song',
  `artist` varchar(255) NOT NULL COMMENT 'Name of the artist or band',
  `album` varchar(255) DEFAULT NULL COMMENT 'Album name (optional)',
  `genre` varchar(255) DEFAULT NULL COMMENT 'Genre of the song',
  `duration_seconds` int(11) DEFAULT NULL COMMENT 'Duration in seconds',
  `release_date` date DEFAULT NULL COMMENT 'Release date of the song',
  `likes` int(11) DEFAULT 0 COMMENT 'Number of likes',
  `spotify_link` varchar(512) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `songs`
--

INSERT INTO `songs` (`id`, `title`, `artist`, `album`, `genre`, `duration_seconds`, `release_date`, `likes`, `spotify_link`, `created_at`) VALUES
(1, 'Requiem', 'Avenged Sevenfold', 'Hail to the King', 'Rock/Metal', 461, '2013-08-22', 28676178, 'https://open.spotify.com/embed/track/2QecHpp1nzPMwo95fwxZ9h?utm_source=generator&theme=0', '2025-01-10 14:56:27'),
(2, '333', 'Matuê', '333', 'Trap', 321, '2024-09-08', 190000, 'https://open.spotify.com/embed/track/0qsKefQyXCzaxjHbOcd8IU?utm_source=generator&theme=0', '2025-01-10 15:57:26'),
(3, 'Gunslinger', 'Avenged Sevenfold', 'Avenged Sevenfold', 'Rock/Metal', 252, '2007-10-30', 127165539, NULL, '2025-01-10 16:22:40'),
(4, 'I Want to Break Free', 'Queen', 'The Works', 'Rock', 272, '1984-04-01', 4000000, 'https://open.spotify.com/embed/track/7iAqvWLgZzXvH38lA06QZg?utm_source=generator&theme=0', '2025-01-17 16:54:00'),
(5, '3S', 'Ryu, The Runner', '3S', 'Trap', 136, '2024-02-05', 91000, 'https://open.spotify.com/embed/track/0cKVD74EVBN9Nn949XYaEq?utm_source=generator&theme=0', '2025-01-20 11:36:35'),
(6, 'Sofrendo com Insônia', 'Emitê Único', 'Sofrendo com Insônia', 'Trap', 136, '2023-11-07', 26000, NULL, '2025-01-20 11:36:35');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for each song', AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
