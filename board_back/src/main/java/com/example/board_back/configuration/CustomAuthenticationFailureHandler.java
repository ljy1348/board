package com.example.board_back.configuration;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * packageName : com.example.board_back.configuration
 * fileName : CustomAuthenticationFailureHandler
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
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
            throws IOException, ServletException {
        // 로그인 실패 이유를 로그에 기록
        System.out.println("로그인 실패 : "+exception);

        // 실패 이유를 request attribute에 추가
        request.setAttribute("errorMessage", exception.getMessage());

        // 실패 페이지로 포워딩
        request.getRequestDispatcher("/login?error=true").forward(request, response);
    }
}
