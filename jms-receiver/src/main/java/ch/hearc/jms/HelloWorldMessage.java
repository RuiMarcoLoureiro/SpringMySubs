package ch.hearc.jms;

public class HelloWorldMessage {
	
	private String hello;
	
	private String bonjour;

	public String getHello() {
		return hello;
	}

	public void setHello(String hello) {
		this.hello = hello;
	}

	public String getBonjour() {
		return bonjour;
	}

	public void setBonjour(String bonjour) {
		this.bonjour = bonjour;
	}

	@Override
	public String toString() {
		return "HelloWorldMessage [hello=" + hello + ", bonjour=" + bonjour + "]";
	}
	
}
