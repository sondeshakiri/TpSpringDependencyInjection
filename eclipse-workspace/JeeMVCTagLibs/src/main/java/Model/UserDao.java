package Model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {
   
   
    
	public User getUserByUsernameAndPassword(String username, String password) {
	    try (
	        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/empolyees?useSSL=false", "root", "");
	        PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM userreg WHERE name=? AND pass=?")
	    ) {
	        preparedStatement.setString(1, username);
	        preparedStatement.setString(2, password);

	        try (ResultSet resultSet = preparedStatement.executeQuery()) {
	            if (resultSet.next()) {
	                String retrievedUsername = resultSet.getString("name");
	                String retrievedPassword = resultSet.getString("pass");
	                String retrievedEmail = resultSet.getString("email");

	                User user = new User();
	                user.setUsername(retrievedUsername);
	                user.setPassword(retrievedPassword);
	                user.setEmail(retrievedEmail);

	                return user;
	            } 
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return null;
	}

 
    public boolean insertUser(User user) {
        try (
        		
        	Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/empolyees?useSSL=false", "root", "");
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO userreg (name, pass,email) VALUES (?, ?)")) {

            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getPassword());
            preparedStatement.setString(2, user.getEmail());

            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0; // Si l'insertion a réussi, renvoie true

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    
    
    
}

