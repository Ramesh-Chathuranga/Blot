import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UserNotifications



@main
class AppDelegate: RCTAppDelegate, UNUserNotificationCenterDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "FinanceDigest"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    // Register for Push Notifications fo auto
//        registerForPushNotifications(application)
//    push notification manual
    UNUserNotificationCenter.current().delegate = self
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }
  
  
  override func extraModules(for bridge: RCTBridge) -> [RCTBridgeModule] {
      return super.extraModules(for: bridge) + [PushNotificationManager()]
    }
  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
  
  // MARK: - Push Notification Setup
   private func registerForPushNotifications(_ application: UIApplication) {
     
     let center = UNUserNotificationCenter.current()
     center.delegate = self
     
     center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
       if let error = error {
         print("Error requesting notification permissions: \(error.localizedDescription)")
       }
       DispatchQueue.main.async {
         application.registerForRemoteNotifications()
       }
     }
   }
  
 
  
  // MARK: - Manually Trigger Push Notification Permission Request
    @objc func requestPushNotificationPermissions() {
     
      let center = UNUserNotificationCenter.current()
      center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
        if let error = error {
          print("Error requesting notification permissions: \(error.localizedDescription)")
        }
        DispatchQueue.main.async {
          UIApplication.shared.registerForRemoteNotifications()
        }
      }
    }

   // Called when the app successfully registers for remote notifications
   override func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
     let token = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
     print("Device Token: \(token)")
   }

   // Called when registration fails
   override func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
     print("Failed to register for remote notifications: \(error.localizedDescription)")
   }

   // Handle notifications when app is in the foreground
   func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
     completionHandler([.banner, .sound, .badge])
   }

   // Handle notifications when the user taps on them
   func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
     let userInfo = response.notification.request.content.userInfo
     print("User tapped notification: \(userInfo)")
     completionHandler()
   }
  
  
}
