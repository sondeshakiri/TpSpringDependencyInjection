<%@ page import="Model.User" %>
<%@ page import="Model.UserDao" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Login Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .success-message {
            text-align: center;
            padding: 20px;
            background-color: #45a049;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>

    <div class="success-message">
        <jsp:useBean id="user" class="Model.User" scope="request" />
        <jsp:setProperty property="*" name="user" />
        
        <H2>Bienvenue <jsp:getProperty name="user" property="username" /></H2>
        <p>Mot de passe: <jsp:getProperty name="user" property="password" /></p>
        <p>Email: <jsp:getProperty name="user" property="email" /></p>
    </div>

</body>
</html>
