
<?php 

include __DIR__ . "/../config/db.php";
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    try 
    {
        $stm = $pdo->query("
            select * from users order by user_id
        ");

        $users = $stm->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "success" => true,
            "data" => $users
        ]);
        exit;
    } 
    catch (PDOException $e) 
    {
        echo json_encode([
            "success" => false,
            "txt" => $e->getMessage()
        ]);
        exit;
    }
}
?>