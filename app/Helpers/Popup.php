<?php

namespace App\Helpers;

class Popup
{

   private static function alert(string $message, string $variant)
   {
      return [
         'popup.type' => 'alert',
         'popup.message' => $message,
         'popup.variant' => $variant,
      ];
   }

   public static function success($message)
   {
      return self::alert($message, 'success');
   }

   public static function info($message)
   {
      return self::alert($message, 'info');
   }

   public static function warning($message)
   {
      return self::alert($message, 'warning');
   }

   public static function error($message)
   {
      return self::alert($message, 'danger');
   }
}