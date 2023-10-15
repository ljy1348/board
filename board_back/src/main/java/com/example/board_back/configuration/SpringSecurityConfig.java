package com.example.board_back.configuration;

//import com.example.board_back.jwt.JwtRequestFilter;
import com.example.board_back.jwt.JwtRequestFilter;
import com.example.board_back.jwt.JwtUtil;
import com.example.board_back.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
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

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtUtil jwtUtil; // JwtUtil 빈을 주입


    @Override
    public void configure(HttpSecurity http) throws Exception {
        JwtRequestFilter jwtRequestFilter = new JwtRequestFilter(jwtUtil, accountService);
        http.csrf().disable();

        http    .httpBasic().disable().cors().and()
                .authorizeRequests()
                .antMatchers("/","/api/register","/api/login").permitAll()
                .antMatchers("/api/user/**","/board/up", "/board/comment/add").hasAnyRole("USER","ADMIN","SUPER_ADMIN")
                .antMatchers("/api/admin/**").hasAnyRole("ADMIN","SUPER_ADMIN")
                .anyRequest().permitAll()
                .and()
                .logout().permitAll().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 중지
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가
    }





}
