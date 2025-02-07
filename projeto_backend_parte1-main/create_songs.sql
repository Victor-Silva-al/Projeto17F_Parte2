CREATE TABLE `songs` (
 `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for each song',
 `title` varchar(255) NOT NULL COMMENT 'Title of the song',
 `artist` varchar(255) NOT NULL COMMENT 'Name of the artist or band',
 `album` varchar(255) DEFAULT NULL COMMENT 'Album name (optional)',
 `genre` varchar(255) DEFAULT NULL COMMENT 'Genre of the song',
 `duration_seconds` int(11) DEFAULT NULL COMMENT 'Duration in seconds',
 `release_date` date DEFAULT NULL COMMENT 'Release date of the song',
 `likes` int(11) DEFAULT 0 COMMENT 'Number of likes',
 `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `songs`
--

INSERT INTO `songs` (`id`, `title`, `artist`, `album`, `genre`, `duration_seconds`, `release_date`, `likes`, `created_at`) VALUES
(1, 'Requiem', 'Avenged Sevenfold', 'Hail to the King', 'Rock/Metal', '461', '2013-08-23', 28676178, '2025-01-10 14:56:27'),
(2, '333', 'Matuê', '333', 'Trap', '321', '2024-09-09', 190000, '2025-01-10 15:57:26'),
(3, 'Gunslinger', 'Avenged Sevenfold', 'Avenged Sevenfold', 'Rock/Metal', '252', '2007-10-30', 127165539, '2025-01-10 16:22:40'),
(4, 'I Want to Break Free', 'Queen', 'The Works', 'Rock', '272', '1984-04-02', 4000000, '2025-01-17 16:54:00'),
(5, '3S', 'Ryu, The Runner', '3S', 'Trap', '136', '2024-02-05', 91000, '2025-01-20 11:36:35'),
(6, 'Sofrendo com Insônia', 'Emitê Único', 'Sofrendo com Insônia', 'Trap', '136', '2023-11-07', 26000, '2025-01-20 11:36:35');