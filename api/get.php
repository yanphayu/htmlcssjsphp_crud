
<?php

include __DIR__ . "/../config/db.php";
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    try
    {
        $id = $_GET['id'] ?? null;

        if(!$id)
        {
            echo json_encode(["success" => false, "txt" => "Missing id"]);
            exit;
        }

        $stm = $pdo->prepare("select * from users where user_id = ?");
        $stm->execute([$id]);
        $user = $stm->fetch(PDO::FETCH_ASSOC);

        if($user)
        {
            echo json_encode(["success" => true, "data" => $user]);
        }
        else
        {
            echo json_encode(["success" => false, "txt" => "User not found"]);
        }
        exit;
    }
    catch(PDOException $e)
    {
        echo json_encode(["success" => false, "txt" => $e->getMessage()]);
        exit;
    }
}
?>
