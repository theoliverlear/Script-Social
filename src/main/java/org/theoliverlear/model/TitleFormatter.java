package org.theoliverlear.model;
//=================================-Imports-==================================
public class TitleFormatter {
    //=============================-Methods-==================================

    //-------------------------Format-Title-Case------------------------------
    public static String formatTitleCase(String title) {
        title = title.toLowerCase();
        title = title.substring(0, 1).toUpperCase() + title.substring(1);
        return title;
    }
    //-------------------------Format-Title-Cases-----------------------------
    public static String formatTitleCases(String title) {
        String[] titleWords = title.split(" ");
        StringBuilder formattedTitle = new StringBuilder();
        for (int i = 0; i < titleWords.length; i++) {
            String titleWord = formatTitleCase(titleWords[i]);
            formattedTitle.append(titleWord);
            if (i != titleWords.length - 1) {
                formattedTitle.append(" ");
            }
        }
        return formattedTitle.toString();
    }
}
