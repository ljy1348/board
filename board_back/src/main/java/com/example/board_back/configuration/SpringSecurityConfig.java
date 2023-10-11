package com.example.board_back.configuration;

//import com.example.board_back.jwt.JwtRequestFilter;
import com.example.board_back.jwt.CustomAuthenticationSuccessHandler;
import com.example.board_back.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * packageName : com.example.board_back.configuration
 * fileName : SpringSecurityConfig
 * author : GGG
 * date : 2023-10-11
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-11         GGG          최초 생성
 */
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
    private AccountService accountService;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http    .cors().and()
                .authorizeRequests()
                .antMatchers("/","/login","/api/register","/api/login").permitAll()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .failureHandler(new CustomAuthenticationFailureHandler())
                .successHandler(new CustomAuthenticationSuccessHandler())
                .loginPage("/api/login")
                .permitAll()
                .and()
                .logout().permitAll();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
