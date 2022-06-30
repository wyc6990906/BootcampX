SELECT assignments.id, assignments.day, assignments.chapter, COUNT(assistance_requests) AS total_requests
FROM assistance_requests
         JOIN assignments ON assistance_requests.assignment_id = assignments.id
GROUP BY assignments.id
ORDER BY total_requests DESC;
