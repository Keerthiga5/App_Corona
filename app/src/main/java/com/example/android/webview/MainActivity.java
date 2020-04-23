package com.example.android.webview;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webview = (WebView) this.findViewById(R.id.webView);
        WebSettings webSettings = webview.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setSupportZoom(true);
        webSettings.setDefaultTextEncodingName("utf-8");

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN){
            webSettings.setAllowUniversalAccessFromFileURLs(true);
            webSettings.setAllowFileAccessFromFileURLs(true);
        }
        String newUrl = "file:///android_asset/aiims.html";
//        webview.setWebChromeClient(new WebChromeClient());
//        webview.setWebViewClient(new WebViewClient(){
//            public boolean shouldOverrideUrlLoading(WebView view, String url) {
//                if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
//                    view.getContext().startActivity(
//                            new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
//                    return true;
//                } else {
//                    return false;
//                }
//            }
//        });
//
//        webview.setWebViewClient(new WebViewClient() {
//            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
//            @Override
//            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
//                Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
//                view.getContext().startActivity(intent);
//                return true;
//            }
//        });

        webview.setWebViewClient(new WebViewClient() {
             @Override
             public boolean shouldOverrideUrlLoading(WebView view, String url) {
                 Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                 view.getContext().startActivity(i);
                 return true;
             }
         });
        webview.setWebViewClient(new WebViewClient());
        webview.loadUrl("file:///android_asset/aiims.html");

    }

//    private class WebViewClient extends android.webkit.WebViewClient
//    {
//        @Override
//        public boolean shouldOverrideUrlLoading(WebView view, String url)
//        {
//            return super.shouldOverrideUrlLoading(view, url);
//        }
//    }
}
