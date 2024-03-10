package TpFaibCouplage;

public class Main {

	public static void main(String[] args) {
		Service service = new ServiceB();
		ClientA client = new ClientA(service);
		client.doSomething();
		System.out.println(client.getInfo());
	
	}

}
