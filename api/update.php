
<?php

include __DIR__ . "/../config/db.php";
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $id = $_POST['id'] ?? null;
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $confirmPassword = trim($_POST['confirmPassword'] ?? '');

    if(empty($id) || empty($name) || empty($email))
    {
        echo json_encode(["success" => false, "txt" => "Name and email are required!"]);
        exit;
    }

    if(!filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        echo json_encode(["success" => false, "txt" => "Invalid email address!"]);
        exit;
    }

    if(!empty($password))
    {
        if($password !== $confirmPassword)
        {
            echo json_encode(["success" => false, "txt" => "Passwords do not match!"]);
            exit;
        }
        $password = password_hash($password, PASSWORD_DEFAULT);
    }

    try
    {
        $imagePath = null;

        if($_FILES['image'] && $_FILES['image']['error'] == UPLOAD_ERR_OK)
        {
            $imageTmp = $_FILES['image']['tmp_name'];
            $imageName = $_FILES['image']['name'];
            $ext = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));

            $dir = '../uploads/';
            if(!file_exists($dir))
            {
                mkdir($dir, 0777, true);
            }

            $imagePath = $dir . uniqid() . '.' . $ext;
            move_uploaded_file($imageTmp, $imagePath);

            $stm = $pdo->prepare("select user_image from users where user_id = ?");
            $stm->execute([$id]);
            $old = $stm->fetch(PDO::FETCH_ASSOC);
            if($old && $old['user_image'] && file_exists($old['user_image']))
            {
                unlink($old['user_image']);
            }
        }

        if(!empty($password) && $imagePath)
        {
            $stm = $pdo->prepare("update users set user_name=?, user_email=?, user_password=?, user_image=? where user_id=?");
            $stm->execute([$name, $email, $password, $imagePath, $id]);
        }
        else if(!empty($password))
        {
            $stm = $pdo->prepare("update users set user_name=?, user_email=?, user_password=? where user_id=?");
            $stm->execute([$name, $email, $password, $id]);
        }
        else if($imagePath)
        {
            $stm = $pdo->prepare("update users set user_name=?, user_email=?, user_image=? where user_id=?");
            $stm->execute([$name, $email, $imagePath, $id]);
        }
        else
        {
            $stm = $pdo->prepare("update users set user_name=?, user_email=? where user_id=?");
            $stm->execute([$name, $email, $id]);
        }

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
