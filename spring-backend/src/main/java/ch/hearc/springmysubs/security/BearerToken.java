package ch.hearc.springmysubs.security;

import lombok.Data;

import java.io.Serializable;

@Data
public class BearerToken{
    private String accessToken ;
    private String tokenType ;

    public BearerToken(String accessToken, String tokenType){
        this.accessToken = accessToken ;
        this.tokenType = tokenType ;
    }
}
