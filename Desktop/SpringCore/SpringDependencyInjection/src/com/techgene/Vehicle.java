import javax.inject.Inject;
import org.springframework.stereotype.Component;

@Component
public class Vehicle {
    private IEngine engine;
    private Tyres tyre;
    
@Inject
public Vehicle(IEngine engine, Tyres tyre) {
    System.out.println("Instantiated via constructor");
    this.engine = engine;
    this.tyre = tyre;
    }

    public IEngine getEngine() {
        return engine;
    }

    public void setEngine(IEngine engine) {
        System.out.println("Instantiated via setter");
        this.engine = engine;
    }

    public Tyres getTyre() {
        return tyre;
    }

    public void setTyre(Tyres tyre) {
        System.out.println("Tyre instantiated via setter");
        this.tyre = tyre;
    }

    @Override
    public String toString() {
        return engine + " " + tyre;
    }
}

	public static void main(String args[]) 
	{ 
		ApplicationContext context = new ClassPathXmlApplicationContext("springContext.xml");

        // Instantiating the object using constructor injection
        Vehicle vehicleConstructor = (Vehicle) context.getBean("InjectwithConstructor");

        // Instantiating the object using setter injection
        Vehicle vehicleSetter = (Vehicle) context.getBean("InjectwithSetter");

        System.out.println("Vehicle instantiated using constructor injection:");
        System.out.println(vehicleConstructor);
        System.out.println();

        System.out.println("Vehicle instantiated using setter injection:");
        System.out.println(vehicleSetter); 
	} 
} 
