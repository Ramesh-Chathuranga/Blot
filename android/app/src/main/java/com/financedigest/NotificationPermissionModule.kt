package com.financedigest



import android.app.Activity
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*

class NotificationPermissionModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val REQUEST_CODE = 1001
    }

    override fun getName(): String {
        return "NotificationPermission"
    }

    @ReactMethod
    fun requestPermission(promise: Promise) {
        val activity: Activity? = currentActivity

        if (activity == null) {
            promise.reject("ERROR", "Activity is null")
            return
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val permission = android.Manifest.permission.POST_NOTIFICATIONS

            if (ContextCompat.checkSelfPermission(activity, permission) == PackageManager.PERMISSION_GRANTED) {
                promise.resolve("granted")
            } else {
                ActivityCompat.requestPermissions(activity, arrayOf(permission), REQUEST_CODE)
                promise.resolve("requested")
            }
        } else {
            promise.resolve("not_required") // For API < 33, no need to request permission
        }
    }
}
