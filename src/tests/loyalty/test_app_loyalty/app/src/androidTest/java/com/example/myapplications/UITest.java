package com.example.myapplications;

import static org.junit.Assert.assertTrue;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.uiautomator.UiDevice;
import androidx.test.uiautomator.UiObject;
import androidx.test.uiautomator.UiObjectNotFoundException;
import androidx.test.uiautomator.UiSelector;
import static androidx.test.platform.app.InstrumentationRegistry.getInstrumentation;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import android.content.Context;
import android.content.Intent;
import androidx.test.platform.app.InstrumentationRegistry;

@RunWith(AndroidJUnit4.class)
public class UITest {

    private UiDevice uiDevice;

    @Before
    public void setUp() {
        uiDevice = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());
    }

    @Test
    public void testAppLaunchAndButtonClick() throws UiObjectNotFoundException {
        // Defina o package name do app que você quer testar
        String packageName = "br.com.cogny.demo";


        // Aguarda o app ser lançado (ajuste o tempo se necessário)
        //uiDevice.waitForWindowUpdate(packageName, 8000);

        // Interage com a UI do app (exemplo: clicar em um botão)

        uiDevice.waitForWindowUpdate(packageName, 2000);

        UiObject button = uiDevice.findObject(new UiSelector().text("Loyalty"));
        button.click();
        uiDevice.waitForWindowUpdate(packageName, 2000);

        UiObject products = uiDevice.findObject(new UiSelector().text("PRODUCTS"));
        products.click();
        uiDevice.waitForWindowUpdate(packageName, 2000);

        UiObject officialJersey = uiDevice.findObject(new UiSelector().text("Official Jersey"));
        officialJersey.click();
        uiDevice.waitForWindowUpdate(packageName, 1000);

        UiObject size = uiDevice.findObject(new UiSelector().text("Size"));
        size.click();
        uiDevice.waitForWindowUpdate(packageName, 1000);

        UiObject xlOption = uiDevice.findObject(new UiSelector().text("XL"));
        xlOption.click();
        uiDevice.waitForWindowUpdate(packageName, 1000);

        uiDevice.click(663, 1531);
        uiDevice.waitForWindowUpdate(packageName, 1000);

        uiDevice.click(434, 1718);

        uiDevice.click(935, 2125);

        UiObject redeem = uiDevice.findObject(new UiSelector().text("REDEEM"));
        redeem.click();
        uiDevice.waitForWindowUpdate(packageName, 1000);

        UiObject redeemed = uiDevice.findObject(new UiSelector().text("REDEEMED"));
        redeemed.click();
        uiDevice.waitForWindowUpdate(packageName, 1000);

        // Verificação para confirmar se o item resgatado aparece na aba "REDEEMED"
        UiObject redeemedItem = uiDevice.findObject(new UiSelector().textContains("Official Jersey"));
        assertTrue("Camiseta não encontrada na aba REDEEMED!", redeemedItem.exists());

        // Você pode adicionar mais interações e verificações conforme necessário.
    }
}
