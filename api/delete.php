
<?php

include __DIR__ . "/../config/db.php";
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $id = $_POST['id'] ?? null;

    if(!$id)
    {
        echo json_encode(["success" => false, "txt" => "Missing id"]);
        exit;
    }

    try
    {
        $stm = $pdo->prepare("select user_image from users where user_id = ?");
        $stm->execute([$id]);
        $user = $stm->fetch(PDO::FETCH_ASSOC);

        if($user && $user['user_image'] && file_exists($user['user_image']))
        {
            unlink($user['user_image']);
        }

        $stm = $pdo->prepare("delete from users where user_id = ?");
        $stm->execute([$id]);

        echo json_encode(["success" => true]);
        exit;
    }
    catch(PDOException $e)
    {
        echo json_encode(["success" => false, "txt" => $e->getMessage()]);
        exit;
    }
}
?>
