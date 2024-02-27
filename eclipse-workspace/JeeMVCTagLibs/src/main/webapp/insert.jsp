<%@ page import="Model.User" %>
<%@ page import="Model.UserDao" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Insert Form</title>
</head>
<body>

    <h1>User Insert Form</h1>

    <jsp:useBean id="user" class="Model.User" scope="request"/>
    <jsp:setProperty property="*" name="user"/>

    <form action="insert.jsp" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required/><br/>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required/><br/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required/><br/>

        <input type="submit" value="Insert User"/>
    </form>

    <%
        UserDao userDao = new UserDao();
        boolean insertionSuccess = userDao.insertUser(user);

        if (insertionSuccess) {
    %>
            <p>User successfully inserted into the database.</p>
    <%
        }
        else {
    %>
            <p>Error inserting user into the database. Please try again.</p>
    <%
        }
    %>

</body>
</html>
