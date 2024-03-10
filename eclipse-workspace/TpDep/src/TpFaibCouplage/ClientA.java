package TpFaibCouplage;

public class ClientA implements Client {
    
    Service service;
    public String info;
     
    public String getInfo() {
		return info;
	}


	public void setInfo(String info) {
		this.info = info;
	}


	public ClientA(Service service) {
        this.service = service;
        
    }
 
    
    @Override
    public void doSomething() {
         
       info = service.getInfo();
       
    }
}