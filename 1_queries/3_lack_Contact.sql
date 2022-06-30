SELECT name, id, cohord_id
FROM students
WHERE email IS NULL
   OR phone IS NULL;
