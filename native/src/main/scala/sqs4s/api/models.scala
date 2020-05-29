package sqs4s.api

import org.http4s.Uri

import scala.concurrent.duration._

case class SqsSettings(queue: Uri, auth: AwsAuth)

/**
  * Settings for SQS consumer
  * @param maxRead maximum number of messages to receive per request, max is 10
  * @param visibilityTimeout a timeout in seconds to prevent other consumers from processing the message again
  * @param waitTimeSeconds an option wait time for long polling, the request is blocked during this time
  * @param pollingRate an polling interval, this value should be slightly higher than [[waitTimeSeconds]]
  * @param initialDelay when request to SQS fails, it will be retried internally with an initial delay
  * @param maxRetry when request to SQS fails, it will be retried internally [[maxRetry]] times
  */
case class ConsumerSettings(
  queue: Uri,
  auth: AwsAuth,
  maxRead: Int = 10,
  visibilityTimeout: Int = 15,
  waitTimeSeconds: Option[Int] = None,
  pollingRate: FiniteDuration = 100.millis,
  initialDelay: FiniteDuration = 100.millis,
  maxRetry: Int = 10
)

case class AwsAuth(accessKey: String, secretKey: String, region: String)