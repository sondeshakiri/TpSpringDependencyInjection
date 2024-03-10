package TPFortCouplage;


public class ClientA {
    ServiceB service;
     
    public void doSomething() {    
        String info = service.getInfo();
    }
}