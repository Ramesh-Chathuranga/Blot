//
//  PushNotificationManager.swift
//  FinanceDigest
//
//  Created by Ramesh Chathuranga on 2025-03-01.
//

import Foundation
import UserNotifications
import UIKit
import React

@objc(PushNotificationManager)
class PushNotificationManager: NSObject, RCTBridgeModule {

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc static func moduleName() -> String {
    return "PushNotificationManager"
  }

  
  @objc func showMessage(_ message: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      AppDelegate().requestPushNotificationPermissions()
      //      print("Received message from React Native: \(message)")
      //      resolve("Message received: \(message)")
    }
    }
  
//  @objc func requestPushNotificationPermissions() {
//    DispatchQueue.main.async {
//      let center = UNUserNotificationCenter.current()
//      center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
//        if let error = error {
//          print("Error requesting notification permissions: \(error.localizedDescription)")
//        }
//        DispatchQueue.main.async {
//          UIApplication.shared.registerForRemoteNotifications()
//        }
//      }
//    }
//  }
}

