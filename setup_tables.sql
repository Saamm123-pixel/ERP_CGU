USE cvrgu_erp;

-- Rename old schema tables to avoid conflict with Spring Boot backend tables
RENAME TABLE fees       TO fees_old;
RENAME TABLE attendance TO attendance_old;
RENAME TABLE notices    TO notices_old;

-- Create backend-compatible tables
CREATE TABLE fees (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id      BIGINT NOT NULL,
  student_name    VARCHAR(255) NOT NULL,
  semester        VARCHAR(255) NOT NULL,
  academic_year   VARCHAR(255) NOT NULL,
  total_amount    DOUBLE NOT NULL,
  paid_amount     DOUBLE NOT NULL DEFAULT 0,
  due_amount      DOUBLE NOT NULL DEFAULT 0,
  paid_date       VARCHAR(255),
  status          VARCHAR(255) NOT NULL DEFAULT 'Pending',
  payment_method  VARCHAR(255)
);

CREATE TABLE attendance (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id    BIGINT NOT NULL,
  student_name  VARCHAR(255) NOT NULL,
  subject       VARCHAR(255) NOT NULL,
  faculty       VARCHAR(255) NOT NULL,
  date          DATE NOT NULL,
  status        VARCHAR(255) NOT NULL,
  academic_year VARCHAR(255) NOT NULL
);

CREATE TABLE notices (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  description  VARCHAR(2000) NOT NULL,
  full_details VARCHAR(5000),
  category     VARCHAR(255) NOT NULL,
  posted_by    VARCHAR(255) NOT NULL,
  posted_date  DATE NOT NULL,
  important    BIT(1) NOT NULL DEFAULT 0,
  target_roles VARCHAR(255) NOT NULL DEFAULT 'all'
);

CREATE TABLE IF NOT EXISTS grades (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id    BIGINT NOT NULL,
  student_name  VARCHAR(255) NOT NULL,
  subject       VARCHAR(255) NOT NULL,
  semester      INT NOT NULL,
  academic_year VARCHAR(255) NOT NULL,
  mid_marks     INT NOT NULL,
  end_marks     INT NOT NULL,
  total_marks   INT NOT NULL,
  grade         VARCHAR(255) NOT NULL,
  grade_points  DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS gate_passes (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id   BIGINT NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  reason       VARCHAR(255) NOT NULL,
  type         VARCHAR(255) NOT NULL,
  out_date     DATE NOT NULL,
  out_time     VARCHAR(255) NOT NULL,
  in_time      VARCHAR(255) NOT NULL,
  parent_phone VARCHAR(255),
  notes        VARCHAR(255),
  status       VARCHAR(255) NOT NULL,
  approved_by  VARCHAR(255),
  applied_on   DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS complaints (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  title             VARCHAR(255) NOT NULL,
  category          VARCHAR(255) NOT NULL,
  priority          VARCHAR(255) NOT NULL,
  description       VARCHAR(2000) NOT NULL,
  submitted_by      VARCHAR(255) NOT NULL,
  submitted_by_role VARCHAR(255),
  submitted_date    DATE NOT NULL,
  status            VARCHAR(255) NOT NULL,
  response          VARCHAR(2000)
);

-- Add profile columns to users
ALTER TABLE users
  ADD COLUMN dob        VARCHAR(255) NULL,
  ADD COLUMN address    VARCHAR(255) NULL,
  ADD COLUMN department VARCHAR(255) NULL,
  ADD COLUMN bio        VARCHAR(1000) NULL;
