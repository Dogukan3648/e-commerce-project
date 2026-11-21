package com.workintech.bandage.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
       return httpSecurity
               .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
               .sessionManagement(session -> session
                       .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authorizeHttpRequests(auth -> auth
                       .requestMatchers(HttpMethod.POST,"/signup","/login","/resend-verification-email").permitAll()
                       .requestMatchers(HttpMethod.GET,"/verify-email").permitAll()
                       .requestMatchers(HttpMethod.GET, "/roles","/roles/**").permitAll()
                       .requestMatchers(HttpMethod.GET,"/products","/products/**",
                               "/categories","/categories/**").permitAll()
                       .requestMatchers("/users","/users/**").denyAll()

                       .requestMatchers(HttpMethod.GET, "/orders/**").authenticated()
                       .requestMatchers(HttpMethod.POST, "/orders").authenticated()
                       .requestMatchers(
                               "/orders", "/orders/**",
                               "/order-items", "/order-items/**"
                       ).denyAll()
                       .requestMatchers(HttpMethod.POST,"/categories","/categories/**").denyAll()
                       .requestMatchers(HttpMethod.PUT,"/categories","/categories/**").denyAll()
                       .requestMatchers(HttpMethod.DELETE,"/categories","/categories/**").denyAll()



                       .anyRequest().authenticated())
               .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults())).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration){
        return configuration.getAuthenticationManager();
    }
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource(@Value("${cors.allowed-origin:http://localhost:5173}") String allowedOrigin){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(allowedOrigin));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));

        configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;
    }

}
