
<?php 

include __DIR__ . "/../config/db.php";
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'POST')
{

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $raw_password = trim($_POST['password'] ?? '');
    $imagePath = '';

    $password = password_hash($raw_password,PASSWORD_DEFAULT);

    if(empty($name) || empty($email) || empty($password))
    {
        echo json_encode([
            "success" => false,
            "res" => "All fields are required!"
        ]);
        exit;
    }

    if(!filter_var($email,FILTER_VALIDATE_EMAIL))
    {
        echo json_encode([
            "success" => false,
            "res" => "Invalid email address!"
        ]);
        exit;
    }

    try 
    {
        if($_FILES['image'] && $_FILES['image']['error'] == UPLOAD_ERR_OK)
        {
            $imageTmp = $_FILES['image']['tmp_name'];
            $imageName = $_FILES['image']['name'];

            $ext = strtolower(pathinfo($imageName,PATHINFO_EXTENSION));

            $dir = '../uploads/';
            if(!file_exists($dir))
            {
                mkdir($dir,0777,true);
            }

            $imagePath = $dir . uniqid() . '.' . $ext;

            if(move_uploaded_file($imageTmp,$imagePath))
            {
                $stm = $pdo->prepare("
                    INSERT INTO users(user_name,user_email,user_password,user_image)
                    VALUES (?,?,?,?)
                ");

                $stm->execute([$name,$email,$password,$imagePath]);

                http_response_code(200);
                echo json_encode([
                    "success" => true,
                ]);
                exit;
            }
        }
        else
        {
            $stm = $pdo->prepare("
                INSERT INTO users(user_name,user_email,user_password,user_image)
                VALUES (?,?,?,?)
            ");

            $stm->execute([$name,$email,$password,'']);
                
            http_response_code(200);
            echo json_encode([
                "success" => true,
            ]);
            exit;
        }
    } 
    catch (PDOException $e) 
    {
        http_response_code(405);
        echo json_encode([
            "success" => false,
        ]);
        exit;
    }
}
?>