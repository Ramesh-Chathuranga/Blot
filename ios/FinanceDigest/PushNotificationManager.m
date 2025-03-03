//
//  PushNotificationManager.m
//  FinanceDigest
//
//  Created by Ramesh Chathuranga on 2025-03-01.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PushNotificationManager, NSObject)

// Expose the requestPermission method to JavaScript
//RCT_EXTERN_METHOD(requestPermission:(RCTPromiseResolveBlock)resolve
//                  reject:(RCTPromiseRejectBlock)reject)
//
//@end


RCT_EXTERN_METHOD(showMessage:(NSString *)message
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
