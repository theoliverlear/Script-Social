package org.theoliverlear.entity.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Field {
    String title;
    public static final Field SOFTWARE_DEVELOPER = new Field("Software Developer");
    public static final Field SOFTWARE_ENGINEER = new Field("Software Engineer");
    public static final Field WEB_DEVELOPER = new Field("Web Developer");
    public static final Field FRONTEND_DEVELOPER = new Field("Frontend Developer");
    public static final Field BACKEND_DEVELOPER = new Field("Backend Developer");
    public static final Field FULLSTACK_DEVELOPER = new Field("Full Stack Developer");
    public static final Field MOBILE_DEVELOPER = new Field("Mobile Developer");
    public static final Field DATA_ANALYST = new Field("Data Analyst");
    public static final Field DATA_SCIENTIST = new Field("Data Scientist");
    public static final Field PRODUCT_MANAGER = new Field("Product Manager");

    public Field(String title) {
        this.title = title;
    }
}
