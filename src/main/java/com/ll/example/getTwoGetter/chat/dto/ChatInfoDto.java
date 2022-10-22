package com.ll.example.getTwoGetter.chat.dto;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatInfoDto {
    @NotNull
    private String chatTitle;
    @NotNull
    private String username;
    @NotNull
    private String partner;
    @NotNull
    private String email;
}
