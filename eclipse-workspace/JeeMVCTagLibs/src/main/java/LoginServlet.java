import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import Model.User;
import Model.UserDao;

public class LoginServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final UserDao userDao = new UserDao();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	response.setContentType("text/html");//pour dire que l'affichage et en HTML
		PrintWriter out= response.getWriter();//permet l'ecriture sur la page
        User user = userDao.getUserByUsernameAndPassword(request.getParameter("name"), request.getParameter("pass"));
        if (user !=null) {
            request.setAttribute("user", user);
    		request.getRequestDispatcher("success.jsp").forward(request, response);
        }
        else {
        	request.setAttribute("errorMessage", "Sorry username or password invalid");
            RequestDispatcher rd = request.getRequestDispatcher("Login.jsp");
            rd.forward(request, response);
        }
    }
}
