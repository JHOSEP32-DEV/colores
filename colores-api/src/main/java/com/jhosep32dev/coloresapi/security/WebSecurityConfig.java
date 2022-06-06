package com.jhosep32dev.coloresapi.security;

import com.jhosep32dev.coloresapi.security.config.JWTAuthenticationEntryPoint;
import com.jhosep32dev.coloresapi.security.config.JWTRequestFilter;
import com.jhosep32dev.coloresapi.security.model.UserRole;
import com.jhosep32dev.coloresapi.security.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    @Primary
    public UserDetailsService userDetailsService() { return new UserDetailsServiceImpl(); };

    @Autowired
    private JWTRequestFilter jwtRequestFilter;

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); };

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/user").hasAnyAuthority(UserRole.ADMIN.toString(), UserRole.USER.toString())
                .antMatchers("/api/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api/colors/**").hasAnyAuthority(UserRole.USER.toString(), UserRole.ADMIN.toString())
                .antMatchers( "/api/colors/**").hasAnyAuthority(UserRole.ADMIN.toString())
                .anyRequest().authenticated()
                .and()
                .formLogin().permitAll()
                .and()

                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().cors()
        ;

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/h2-console/**/**");
        web.ignoring().antMatchers("/api/login/**");
    }

    private CorsConfiguration buildConfig() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("*");
        configuration.addAllowedOrigin("http://localhost:4200");
        configuration.addAllowedOrigin("http://localhost:8081");
        configuration.addAllowedOrigin("http://localhost");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(false);

        return configuration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildConfig());

        return new CorsFilter(source);
    }
}
