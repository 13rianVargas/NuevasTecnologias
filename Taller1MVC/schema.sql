-- ESTRUCTURA CREACIONAL
CREATE DATABASE IF NOT EXISTS Investigacion_APIs;
USE Investigacion_APIs;

DROP TABLE IF EXISTS articulos;

CREATE TABLE articulos (
  id INT NOT NULL AUTO_INCREMENT,
  autores TEXT NOT NULL,
  anio INT NOT NULL,
  titulo TEXT NOT NULL,
  revista VARCHAR(255) NOT NULL,
  volumen VARCHAR(50) DEFAULT NULL,
  numero VARCHAR(50) DEFAULT NULL,
  paginas VARCHAR(50) DEFAULT NULL,
  doi VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- INSERTS
INSERT INTO articulos (autores, anio, titulo, revista, volumen, numero, paginas, doi) 
VALUES 

-- BRIAN
(
  'Chatterjee, A., & Prinz, A.', 
  2022, 
  'Applying Spring Security Framework with KeyCloak-Based OAuth2 to Protect Microservice Architecture APIs: A Case Study', 
  'Sensors', 
  '22', 
  '5', 
  '1703', 
  'https://doi.org/10.3390/s22051703'
),
(
  'Alonso, J. C., Ernst, M. D., Segura, S., & Ruiz-Cortés, A.', 
  2025, 
  'Test Oracle Generation for REST APIs', 
  'ACM Transactions on Software Engineering and Methodology', 
  '35', 
  '1', 
  '19', 
  'https://doi.org/10.1145/3726524'
),
(
  'Yaroshynskyi, M., Puchko, I., Prymushko, A., Kravtsov, H., & Artemchuk, V.', 
  2025, 
  'Investigating the Evolution of Resilient Microservice Architectures: A Compatibility-Driven Version Orchestration Approach', 
  'Digital', 
  '5', 
  '3', 
  '27', 
  'https://doi.org/10.3390/digital5030027'
),

-- SEBASTIAN
(
  'Mousavi, Z., Islam, C., Babar, M. A., Abuaddba, A., & Moore, K.',
  2025,
  'Detecting misuse of security APIs: A systematic review',
  'ACM Computing Surveys',
  '57',
  '12',
  'Article 303, 1–39',
  'https://doi.org/10.1145/3735968'
),
(
  'Ouyang, R., Wang, J., Xu, H., Chen, S., Xiong, X., et al.',
  2023,
  'A microservice and serverless architecture for secure IoT system',
  'Sensors',
  '23',
  '10',
  '4868',
  'https://doi.org/10.3390/s23104868'
),
(
  'Atanasov, I., Pencheva, E., Trifonov, V., & Kassev, K.',
  2024,
  'Railway cloud: Management and orchestration functionality designed as microservices',
  'Applied Sciences',
  '14',
  '6',
  '2368',
  'https://doi.org/10.3390/app14062368'
),

-- LINA
(
  'Chan, D. Y., Wang, J.-F., Chang, C.-I., & Du, J.-W.', 
  2025, 
  'A low-cost autonomous outdoor robot with stabilized controller and deep-learning integrated GPS navigator under end-to-end implementation', 
  'Journal of the Chinese Institute of Engineers', 
  '48', 
  NULL, 
  '1081–1095', 
  'https://doi.org/10.1080/02533839.2025.2496781'
),
(
  'Fattebert, J.-L., Negre, C. F. A., Finkelstein, J., Mohd-Yusof, J., Osei-Kuffuor, D., Wall, M. E., Zhang, Y., Bock, N., & Mniszewski, S. M.', 
  2024, 
  'Hybrid programming-model strategies for GPU offloading of electronic structure calculation kernels', 
  'Journal of Chemical Physics', 
  '160', 
  '12', 
  '122501', 
  'https://doi.org/10.1063/5.0198797'
),
(
  'Kumar, S., & Kumar, R.', 
  2025, 
  'A comprehensive study on additive manufacturing techniques, machine learning integration, and Internet of Things-driven sustainability opportunities', 
  'Journal of Materials Engineering and Performance', 
  '34', 
  '10', 
  '8253–8320', 
  'https://doi.org/10.1007/s11665-025-10757-x'
);