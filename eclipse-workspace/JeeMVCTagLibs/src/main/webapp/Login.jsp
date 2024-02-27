<%@ page import="Model.User" %>
<jsp:useBean id="user" class="Model.User" scope="request"/>
<jsp:setProperty property="*" name="user"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <style>
        body {
            margin-top:50px;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        label {
            display: block;
            margin-bottom: 8px;
        }

        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 16px;
            box-sizing: border-box;
        }

        input[type="submit"] {
            background-color: #4caf50;
            color: white;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

    <form action="Login" method="post">
        <label for="name">Username:</label>
        <input type="text" id="name" name="name" required/><br/>
        
        <label for="pass">Password:</label>
        <input type="password" id="pass" name="pass" required/><br/>
        
        <input type="submit" value="Login" />
    </form>
    
     <%-- Afficher le message d'erreur s'il est présent --%>
    <c:if test="${not empty errorMessage}">
        <p style="color: red;">${errorMessage}</p>
    </c:if>

</body>
</html>
