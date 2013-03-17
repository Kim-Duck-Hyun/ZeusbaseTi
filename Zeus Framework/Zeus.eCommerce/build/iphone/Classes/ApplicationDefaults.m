/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"Nls4CjNggov00RZGBSSHfYRtU8sCqvMm"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"ERKHfHsqPy2P6jyp4BwUokberH9Ai74W"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"jgGarlDFocFIKdkmREUB2hWKpauHeQlK"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"QwtAHJLKZ7zTomNvCgZz1PkcNbU4f2Tz"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"5bn6ITsEDVdDDZtFfrRr61TCaCteKkCD"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"ksqeFj8YJ7PebCQi8tfZs8qrwR6JcfbU"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
