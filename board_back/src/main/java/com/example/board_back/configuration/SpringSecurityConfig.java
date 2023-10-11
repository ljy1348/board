package com.example.board_back.configuration;

import com.example.board_back.service.AccountService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

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
        http
                .authorizeRequests()
                .antMatchers("/","/login","/create").permitAll()
                .antMatchers("/hello").hasRole("USER")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .failureHandler(new CustomAuthenticationFailureHandler())
                .loginPage("/login")
                .defaultSuccessUrl("/create")
                .permitAll()
                .and()
                .logout().permitAll();
    }
}
